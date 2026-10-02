const express = require('express');
const cors = require('cors');
const servicesRoutes = require('./routes/services.routes');
const appointmentsRoutes = require('./routes/appointments.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/services', servicesRoutes);
app.use('/api/appointments', appointmentsRoutes);

module.exports = app;