const express = require('express');
const MainController = require('./MainController');

const router = express.Router();

router.get('/alljsons', MainController.getalljsoins)

module.exports = router;