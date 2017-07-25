import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const documentSchema = mongoose.Schema({
  collaborators: Array,
  text: String,
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);
const Document = mongoose.model('User', documentSchema);

export { User, Document };
