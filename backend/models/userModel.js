const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
  },
  role: {
    type: String,
    enum: ['member', 'admin'],
    default: 'member',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
