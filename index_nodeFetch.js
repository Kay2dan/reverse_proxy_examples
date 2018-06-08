const express = require('express');
const bodyParser = require('body-parser');
const nodeFetch = require('node-fetch');

const app = express();
app.set('port', 1111);
app.use(bodyParser.json()); // for parsing application/json
app.use('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('this is a normal response');
});

app.get('/d*', (req, res) => {
  res.send('this is going to be forwarded on to difitek & the results relayed back');
});

const createRequestConfig = bodyObject => ({
  method: 'POST',
  body: JSON.stringify(bodyObject),
  headers: {
    'cv-auth':
      'AuthToken ApiKey="fhfuehf@afd.com", TokenDigest="oKYQitP9PvVVk=", Nonce="f94242539e8f2447e627", Created="2018-03-20T14:39:32+00:00", Username="abc@abc.com", Password="BwYJB2RRQQYABg=="',
    'Content-Type': 'application/json'
  }
});

app.post('/d*', (req, res) => {
  console.log('within POST, req is =>', req.method);
  // const reqBody = req.body;
  const { body } = req;
  // do server-side form validation here.
  const url = 'https://api.sandbox.crowdvalley.com/v1/testsatoshiltd/users';
  // temp for user registration
  const reqObject = {
    email: body.email,
    password: body.password,
    url: 'http:/localhost:3000/confirmRegistration'
  };
  nodeFetch(url, createRequestConfig(reqObject))
    .then(data => data.json())
    .then(response => console.log(response))
    .catch(err => console.log(err));
});

app.listen(app.get('port'), () => console.log('Server instance running on http://localhost:1111'));
