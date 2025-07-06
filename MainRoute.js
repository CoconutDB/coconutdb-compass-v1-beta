const express = require('express');


const router = express.Router();

router.get('/alljsons', MainController.getalljsoins)

module.exports = router;