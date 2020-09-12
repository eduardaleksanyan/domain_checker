
import express from 'express';
import cors from 'cors';
import uploadRouter from './routes/upload';
import domainsRouter from './routes/domains';
const { receiveQueue } = require('./common/receive.queue');

require('dotenv').config({path: './config/config.env'});

const corsOptions: cors.CorsOptions = {
    origin: 'http://localhost:3000'
};

const app = express();
app.use('/upload', cors(corsOptions), uploadRouter);
app.use('/domains', cors(corsOptions), domainsRouter);

app.get('/', (req, res) => {
    res.send('Sorry');
})  

try {
    receiveQueue();
} catch (err) {
    console.log(err);
}

const port = process.env.PORT || 5000;
app.listen(port);