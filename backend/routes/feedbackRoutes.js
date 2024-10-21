const express = require('express');
const feedbackController = require('../controllers/feedbackController');

const x = feedbackController;
const router = express.Router();

router.route('/').get(x.getAllFeedbacks).post(x.createFeedback);
router
  .route('/:id')
  .get(x.getEventFeedbacks)
  .patch(x.updateFeedback)
  .delete(x.deleteFeedback);

module.exports = router;
