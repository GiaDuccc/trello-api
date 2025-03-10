// const express = require('express'); 
import express from 'express';

const app = express();
const hostName = 'localhost';
const port = 8017;

app.get('/', function (req, res) {
  res.send('<h1>Hello Gia Duc</h1>')
});

app.listen(port, hostName, () => {
  console.log(`running http://${hostName}:${port}/`);
})