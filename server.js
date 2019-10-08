const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const db = require('./db');
const { School, Student } = db.models;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//app.use(express.urlencoded());

app.get('/dist/main.js', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist/main.js'));
});

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

// ROUTES
app.get('/api/schools', (req, res, next) => {
  School.findAll({ include: [ Student ] })
    .then(schools => res.send(schools))
    .catch(next);
});

app.get('/api/students', (req, res, next) => {
  Student.findAll()
    .then(students => res.send(students))
    .catch(next);
});

app.post('/api/students', (req, res, next) => {

  Student.create(req.body)
    .then(student => res.send(student))
    .catch(next);
});

app.put('/api/students/:id', (req, res, next) => {
  Student.findByPk(req.params.id)
    .then(instance => {
      Object.assign(instance, req.body);
      instance.save();
      res.send(instance);
    })
    .catch(next);
    // Student.findByPk(req.params.id)
    //   .then(instance => Object.assign(instance, req.body))
    // instance.save()
    //   .then(instance => res.send(instance))
    //   .catch(next);
});

app.delete('/api/students/:id', (req, res, next) => {
  Student.findByPk(req.params.id)
    .then(student => student.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

// PORT CONNECTION
const port = process.env.PORT || 3000;
db.syncAndSeed()
  .then(() => app.listen(port, () => console.log(`listening on port ${port}`)));

