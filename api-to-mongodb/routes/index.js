const express = require('express')
const router = express.Router();
const weatherController = require('../controller/index');

router.get('/temperature', weatherController.getTemperatureByCity);

module.exports = router;