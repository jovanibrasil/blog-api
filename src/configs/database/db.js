const Sequelize = require('sequelize');

const env = process.env.NODE_ENV;
let dbConfig;

if(env){
    dbConfig = require(`./db-config.${env}`);
}else{
    dbConfig = require('./db-config.dev');
}

const User = require('../../models/User');
const Task = require('../../models/Task');
const Tag = require('../../models/Tag');

const connection = new Sequelize(dbConfig);

User.init(connection);
Task.init(connection);
Tag.init(connection);

Task.associate(connection.models);
User.associate(connection.models);
Tag.associate(connection.models);

module.exports = connection;