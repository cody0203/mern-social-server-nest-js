import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already existed',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
  },
  bio: {
    type: String,
    trim: true,
  },
  avatar: {
    data: Buffer,
    contentType: String,
  },
  following: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  ],
  followers: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  ],
  hashed_password: {
    type: String,
    required: 'Password is required',
    index: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

export default userSchema;
