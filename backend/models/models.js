const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  }
});

const documentSchema = mongoose.Schema({
  title: String,
  collabs: [
  //array of users who have accessed the doc
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  //actual text contents of document
  text: String,
  dateCreated: Date,
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  password: String,
  history: Array,
  current: String
});

const User = mongoose.model('User', userSchema);
const Document = mongoose.model('Document', documentSchema);

module.exports = { User, Document };
