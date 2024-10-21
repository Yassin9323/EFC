const express = require('express');
const serviceController = require('../controllers/serviceController');

const x = serviceController;
const router = express.Router();

router.route('/').get(x.getAllServices).post(x.createService);
router
  .route('/:id')
  .get(x.getService)
  .patch(x.updateService)
  .delete(x.deleteService);

module.exports = router;
