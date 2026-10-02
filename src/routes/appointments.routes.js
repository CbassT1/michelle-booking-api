const express = require('express');
const router = express.Router();
const { createAppointment } = require('../controllers/appointments.controller');

router.post('/', createAppointment);

module.exports = router;