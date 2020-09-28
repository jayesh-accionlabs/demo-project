const express = require('express');
const userCtrl = require('./application.controller');
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
/** POST /api/application - Create user */
  .post(userCtrl.create)

  router.route('/')
/** GET /api/application - GET user */
  .get(userCtrl.getUser)

module.exports = router;
