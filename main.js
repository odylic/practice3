const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const studentController = require('./StudentController');

const PORT = 3000;

mongoose.connect(
  'mongodb+srv://student:ilovetesting@database-assessment.6vall.mongodb.net/week-4-assessment?retryWrites=true&w=majority',
  {useNewUrlParser: true, useUnifiedTopology: true}
);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const studentRouter = express.Router();
app.use('/student', studentRouter);

// Create a student in the database
// http://localhost:3000/student
studentRouter.post('/', studentController.createStudent);

// Get a student from the database
// http://localhost:3000/student/"name"
studentRouter.get('/:name', studentController.getStudent);

// Change a students name
// http://localhost:3000/student/"name"
studentRouter.patch('/:name', studentController.updateStudent);

// Delete a student from the database
// http://localhost:3000/student/"name"
studentRouter.delete('/:name', studentController.deleteStudent);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use('*', (req, res) => {
  res.status(400).send('You done fucked up');
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
