const express = require('express');
const applicationRoutes = require('./modules/application/application.route');
const router = express.Router(); 
/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount application routes at /application
router.use('/application', applicationRoutes);

module.exports = router;
