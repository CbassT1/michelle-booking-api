require('dotenv').config();
const app = require('./app');
const startCronJobs = require('./jobs/releaseHolds');

const port = process.env.PORT || 3000;

startCronJobs();

app.listen(port, () => {
    console.log(`Servidor modular corriendo en http://localhost:${port}`);
});