const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A event must have a name'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'A event must have a description'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDate: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  location: {
    type: String,
    required: [true, 'A event must have a location'],
    trim: true,
  },
  host: {
    type: String,
    required: [true, 'A event must have a host'],
    trim: true,
  },

  attendes_offline: {
    type: Number,
    default: 0,
  },
  attendes_online: {
    type: Number,
    default: 0,
  },
  images: [String],
  time: {
    type: String,
    required: [true, 'A event must have a time'],
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Completed'],
    default: 'Upcoming',
  },
  feedback: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feedback',
    },
  ],
});
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
