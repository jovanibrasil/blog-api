const express = require('express');
const consign = require('consign');

const app = express();

consign()
    .include('models')
    .then('configs/middlewares.js')
    .then('routes')
    .then('configs/boot.js')
    .into(app);