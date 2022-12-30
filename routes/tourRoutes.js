const express = require('express');
const tourcontroller = require('../controllers/tourcontroller');
const router = express.Router();

// router.param('id', tourcontroller.checkid);
router
  .route('/top-5-cheap')
  .get(tourcontroller.gettopaliastour, tourcontroller.getalltour);

router.route('/tourstat').get(tourcontroller.gettourstats);
router
  .route('/')
  .get(tourcontroller.getalltour)
  .post(tourcontroller.createtour);
router
  .route('/:id')
  .patch(tourcontroller.patchtour)
  .delete(tourcontroller.deletetour)
  .get(tourcontroller.gettour);

module.exports = router;
