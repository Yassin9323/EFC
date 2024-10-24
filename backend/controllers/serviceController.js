const Service = require('../models/serviceModel');

// Get All Services
exports.getAllServices = async (req, res) => {
  try {
    const service = await Service.find();
    res.status(200).json({
      status: 'success',
      results: service.length,
      data: {
        service,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};

// Get Service by ID
exports.getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        service,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

//Create Service
exports.createService = async (req, res) => {
  try {
    console.log(req.body); // Check if this logs the expected data
    const newService = await Service.create(req.body); // Ensure 'Service' is the correct model
    res.status(201).json({
      status: 'success',
      data: {
        service: newService,
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

// Update Service by ID
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        service,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// Delete Service by ID
exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);

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
