const logger = require("../logger");

module.exports = {
  database: "blogdb",
  host: "localhost",
  username: "postgres",
  password: "password",
  dialect: "postgres",
  logging: sql => {
    logger.info(`[${new Date()}] ${sql}`);
  },
  define: {
    timestamps: true, // define created_at and updated_at
    underscored: true
  }
};
