const {restart} = require('nodemon');
const Student = require('./StudentModel');

const StudentController = {
  // Create a new student in the Database
  // Their information will be sent in the request body
  // This should send the created student
  createStudent(req, res) {
    const {firstName, lastName, age} = req.body;

    Student.create({
      firstName: firstName,
      lastName: lastName,
      age: age,
    })
      .then((data) => {
        res.send(data);
      })
      .catch(() => res.send(400));
    // try {
    //   const newStudent = Student.create(req.body);
    //   res.locals.student = newStudent;
    //   return newStudent;
    // } catch (err) {
    //   return res.status(400);
    // }
  },

  // Get a student from the database and send it in the response
  // Their first name will be in the request parameter 'name'
  // This should send the found student
  getStudent(req, res) {
    Student.findOne({firstName: req.params.name})
      .then((response) => {
        if (response === null) res.send(400);
        res.send(response);
      })
      .catch(() => res.send(400));

    // return Student.findOne(req.name, (err, student) => {
    //   if (err) return res.status(400);
    //   res.locals.student = student;
    // });
  },

  // Get a student from the database and update the student
  // The student's first name will be in the request parameter 'name'
  // The student's new first name will be in the request body
  updateStudent(req, res) {
    Student.updateOne(
      {firstName: req.params.name},
      {$set: {firstName: req.body.firstName}}
    )
      .then(() => res.send(200))
      .catch(() => res.send(400));

    // return (
    //   Student.findOneAndUpdate(req.name),
    //   (err, newName) => {
    //     if (err) return res.status(400);
    //     res.locals.student.name = newName;
    //     return newName;
    //   }
    // );
  },

  // Delete a student from the database
  // The student's first name will be sent in the request parameter 'name'
  // This should send a success status code
  deleteStudent(req, res) {
    Student.deleteOne({
      firstName: req.params.name,
    })
      .then(() => res.send(200))
      .catch(() => res.send(400));

    // return Student.deleteOne(req.name, (err) => {
    //   if (err) return res.status(400);
    // });
  },
};

module.exports = StudentController;
