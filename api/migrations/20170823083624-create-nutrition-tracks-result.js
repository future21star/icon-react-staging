'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('nutritionTracksResult', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      nutritionTrack: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nutritionCalories: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nutritionCarbs: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nutritionProtein: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('nutritionTracksResult');
  }
};