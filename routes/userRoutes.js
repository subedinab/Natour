const express = require('express');
const usercontroller = require('./../controllers/usercontroller');

const router = express.Router();

router
  .route('/')
  .get(usercontroller.getalluser)
  .post(usercontroller.createuser);
router
  .route('/:id')
  .patch(usercontroller.patchuser)
  .delete(usercontroller.deleteuser)
  .get(usercontroller.getuser);

module.exports = router;
