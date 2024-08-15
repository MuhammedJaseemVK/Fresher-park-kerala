const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const cron = require('node-cron');
const https =require('https');

const port = 8080;
const jobRoutes = require('./routes/jobRoutes');
const { scrapJobsController } = require('./controller/jobController');

dotenv.config();
connectDB();
app.use(cors());
app.use('/api/v1/jobs', jobRoutes);
cron.schedule('*/10 * * * *', async () => {
     scrapJobsController();
});


function pingServer() {
    console.log('Pinging server to keep it alive...');
    
    const options = {
        hostname:'https://fresher-park-kerala.onrender.com/',
        method: 'GET',
        timeout: 60000 
    };

    const req = https.request(options, (res) => {
        console.log(`Ping response: ${res.statusCode}`);

    });

    req.on('timeout', () => {
        req.destroy();
        console.error('Request timed out');
    });

    req.on('error', (err) => {
        console.error('Ping error:', err.message);
    });

    req.end();
}

cron.schedule('*/10 * * * *', pingServer);


app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
);


app.listen(port, () => {
    console.log(`scrapping app listening on port ${port}`);
});