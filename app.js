'use strict';
const express = require('express');
const catModel = require('./models/catModel');
const app = express();
const port = 3000;

app.get('/cat', (req, res) => {
  res.send(catModel.cats)
});

app.get('/cat/:id', (req, res) => {
  console.log(req.params.id);
  res.send(catModel.cats[req.params.id]);
});

app.post('/cat', (req, res) => {
  res.send('From this endpoint you can add cats.')
});

app.put('/cat', (req, res) => {
  res.send('From this endpoint you can edit cats.')
});

app.delete('/cat', (req, res) => {
  res.send('From this endpoint you can delete cats.')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
