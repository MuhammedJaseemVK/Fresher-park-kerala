const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const cron = require('node-cron');

const port = 8080;
const jobRoutes = require('./routes/jobRoutes');
const { scrapJobsController } = require('./controller/jobController');

dotenv.config();
connectDB();
app.use(cors());
app.use('/api/v1/jobs', jobRoutes);
cron.schedule('0 * * * *', async () => {
     scrapJobsController();
});

app.use(express.static(path.join(__dirname, '/frontend/build')));

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);


app.listen(port, () => {
    console.log(`scrapping app listening on port ${port}`);
});