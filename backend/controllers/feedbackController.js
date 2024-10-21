const Feedback = require('../models/feedbackModel');
const Event = require('../models/eventModel');

// Get All Feedback
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json({
      status: 'success',
      results: feedback.length,
      data: {
        feedback,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};

exports.getEventFeedbacks = async (req, res) => {
  try {
    // Find the event by ID and populate the feedback field
    const event = await Event.findById(req.params.id).populate({
      path: 'feedback', // Populates the feedback array
      select: 'rating email comments', // Fields you want to display
    });

    // If event is not found
    if (!event) {
      return res.status(404).json({
        status: 'fail',
        message: 'Event not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        feedbacks: event.feedback, // Return only the feedbacks
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message || 'An error occurred while retrieving feedback',
    });
  }
};

//Create Feedback
exports.createFeedback = async (req, res) => {
  try {
    console.log(req.body); // Check if this logs the expected data
    const newFeedback = await Feedback.create(req.body); // Ensure 'Feedback' is the correct model
    res.status(201).json({
      status: 'success',
      data: {
        feedback: newFeedback,
      },
    });

    await Event.findByIdAndUpdate(req.body.eventId, {
      $push: { feedback: newFeedback.id },
    });
  } catch (err) {
    console.error(err); // Log any errors that occur
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

// Update Feedback by ID
exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        feedback,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// Delete Feedback by ID
exports.deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);

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
