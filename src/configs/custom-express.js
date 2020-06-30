const express = require('express');
const app = express();
app.use(express.json());
const routes = require('../routes/routes');
routes(app);

require('./database/db');

module.exports = app