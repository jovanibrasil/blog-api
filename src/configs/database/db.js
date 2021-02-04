const Sequelize = require("sequelize");

const env = process.env.NODE_ENV;
let dbConfig;

if (env) {
  dbConfig = require(`./db-config.${env}`);
} else {
  dbConfig = require("./db-config.dev");
}

const User = require("../../models/User");
const Post = require("../../models/Post");
const Tag = require("../../models/Tag");

const connection = new Sequelize(dbConfig);

User.init(connection);
Post.init(connection);
Tag.init(connection);

Post.associate(connection.models);
User.associate(connection.models);
Tag.associate(connection.models);

module.exports = connection;
