const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
import { User } from './models/models';
import hashPassword from './helper/passwordHash';
// import passportConnect from './helper/passportConnect';
const api = require('./routes/routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connect to mongoDB
const connect = process.env.MONGODB_URI || require('./models/connect');
mongoose.connect(connect);

//passport setup
require('./helper/passport');

// Example route
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/', api);




app.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!');
});
