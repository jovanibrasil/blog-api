'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Altering commands.
    await queryInterface.createTable('tasks', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
      },
      done: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    //Add reverting commands here.
    await queryInterface.dropTable('tasks');
  }
};
