import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  collaborating: Array //shared documents (save by doc id)
});

const documentSchema = mongoose.Schema({
  collaborators: Array, //array of users who've accessed the doc
  text: String, //actual text of document
  dateCreated: Date,
  owner: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  password: String
});

const User = mongoose.model('User', userSchema);
const Document = mongoose.model('User', documentSchema);

export { User, Document };
