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
});

const documentSchema = mongoose.Schema({
  title: String,
  collabs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ], //array of users who've accessed the doc
  text: String, //actual text of document
  dateCreated: Date,
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  password: String
});

const User = mongoose.model('User', userSchema);
const Document = mongoose.model('Document', documentSchema);

module.exports = { User, Document };

