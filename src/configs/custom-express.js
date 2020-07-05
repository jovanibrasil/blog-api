const express = require('express');
const app = express();

app.use(express.static("public"));
app.use(express.json());

const auth = require('./security/sec')();

app.use(auth.initialize());

const routes = require('../routes/routes');
routes(app);

require('./database/db');

module.exports = app