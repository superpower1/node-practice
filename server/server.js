// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var lions = [];
var id = 0;

// TODO: make the REST routes to perform CRUD on lions

app.get('/lions', (req, res) => {
  res.json(lions);
})

app.get('/lion/:id', (req, res) => {
  const lion = _.find(lions, { id: Number(req.params.id) });
  console.log(lions, req.params.id )
  res.json(lion || {});
})

app.post('/lions', (req, res) => {
  const { name, age, pride, gender } = req.body;
  const newLion = {
    id: id++,
    name,
    age,
    pride,
    gender,
  }
  lions.push(newLion);
  res.json(newLion);
})

app.put('/lions/:id', (req, res) => {
  const lion = _.find(lions, { id: req.params.id });
  const { name, age, pride, gender } = req.body;
  if (name) lion.name = name;
  if (age) lion.age = age;
  if (pride) lion.pride = pride;
  if (gender) lion.gender = gender;
  res.json(lion);
})

app.delete('/lions/:id', (req, res) => {
  const lion = _.find(lions, { id: req.params.id });
  const newLions = _.filter(lions, (lion) => {
    lion.id !== req.params.id;
  })
  lions = newLions;
  res.json(lion);
})

app.listen(3000);
console.log('on port 3000');
