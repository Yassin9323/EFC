const express = require('express');
const eventController = require('../controllers/eventController');

const x = eventController;
const router = express.Router();

router.route('/').get(x.getAllEvents).post(x.createEvent);
router.route('/:id').get(x.getEvent).patch(x.updateEvent).delete(x.deleteEvent);

module.exports = router;
