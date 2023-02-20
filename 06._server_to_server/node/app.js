import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello stranger' });
});

app.get('/date', (req, res) => {
  res.send(new Date());
});

app.get('/datefromfastapi', (req, res) => {
  fetch('http://127.0.00.1:8000/date')
    .then((response) => response.json())
    .then((data) => {
      res.send(data);
    });
});

app.get('/datafromlars', (req, res) => {
  fetch('https://5591-185-203-216-225.eu.ngrok.io')
    .then((response) => response.json())
    .then((data) => {
      res.send(data);
    });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
