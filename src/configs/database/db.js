const Sequelize = require('sequelize');
const dbConfig = require('./db-config');

const User = require('../../models/User');
const Task = require('../../models/Task');

const connection = new Sequelize(dbConfig);

User.init(connection);
Task.init(connection);
Task.associate(connection.models);
User.associate(connection.models);

module.exports = connection;