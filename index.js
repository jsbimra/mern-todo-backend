const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// console.log('MERN SERVER JS, ', process.env);
const uri = process.env.ATLAS_URI;

mongoose.Promise = global.Promise;

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true, 
  useCreateIndex: true,
  user: 'adminjatsingh', // IMPORTANT TO HAVE IT HERE AND NOT IN CONNECTION STRING
  pass: 'engineer110', // IMPORTANT TO HAVE IT HERE AND NOT IN CONNECTION STRING
  dbName: 'jatmdbcluster', // IMPORTANT TO HAVE IT HERE AND NOT IN CONNECTION STRING
}).then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require('./api/exercises');
const usersRouter = require('./api/users');

// console.log(exercisesRouter, usersRouter);

app.use('/users', usersRouter);
app.use('/exercises', exercisesRouter);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});