const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A service must have a name'],
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    default: 'free',
  },
  availableSlots: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  images: [String],
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
