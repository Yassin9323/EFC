const Event = require('../models/eventModel');
const APIFeatures = require('../utils/apiFeatures');

exports.aliasTopEvents = (req, res, next) => {
  req.query.limit = '5';
  // req.query.sort = '-ratings';
  // req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// Get All events
exports.getAllEvents = async (req, res) => {
  try {
    const features = new APIFeatures(Event.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const events = await features.query;

    res.status(200).json({
      status: 'success',
      results: events.length,
      data: {
        events,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};

// Get Event by ID
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        event,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

//Create Event
exports.createEvent = async (req, res) => {
  try {
    console.log(req.body); // Check if this logs the expected data
    const newEvent = await Event.create(req.body); // Ensure 'Event' is the correct model
    res.status(201).json({
      status: 'success',
      data: {
        event: newEvent,
      },
    });
  } catch (err) {
    console.error(err); // Log any errors that occur
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

// Update Event by ID
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        event,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// Delete Event by ID
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
