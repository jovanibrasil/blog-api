"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("posts", "user_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id"
      },
      //allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("posts", "user_id");
  }
};
