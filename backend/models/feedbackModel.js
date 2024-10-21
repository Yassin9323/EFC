const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Reference to the Event model
    required: [true, 'A feedback must have an eventId'],
  },
  email: {
    type: String,
    required: [true, 'A feedback must have an email'],
    unique: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'A feedback must have a score between 1 : 5'],
  },
  comments: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
