const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const db = require('./db');
const { School, Student } = db.models;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/dist/main.js', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist/main.js'));
});

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/schools', (req, res, next) => {
  School.findAll()
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

const port = process.env.PORT || 3000;

db.syncAndSeed()
  .then(() => app.listen(port, () => console.log(`listening on port ${port}`)));

