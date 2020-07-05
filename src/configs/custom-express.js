const express = require('express');
const app = express();
const cors = require('cors');

const helmet = require('helmet');
const compression = require('compression');

const morgan = require('morgan');
const logger = require('./logger')

app.use(express.static('public'));
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(helmet());
app.use(compression())

app.use(morgan('common', {
    stream: {
        write: (message) => {
            logger.info(message);
        }
    }
}));

const auth = require('./security/sec')();

app.use(auth.initialize());

const routes = require('../routes/routes');
routes(app);

require('./database/db');

module.exports = app