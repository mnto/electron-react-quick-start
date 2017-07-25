const express = require('express');
const app = express();

//connect to mongoDB

const mongoose = require('mongoose');

const connect = process.env.MONGODB_URI || require('./models/connect');
mongoose.connect(connect);


// Example route
app.get('/', function (req, res) {
  res.send('Hello World!');
});





app.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!');
});
