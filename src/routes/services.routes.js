const express = require('express');
const router = express.Router();
const { getServices } = require('../controllers/services.controller');

router.get('/', getServices);

module.exports = router;