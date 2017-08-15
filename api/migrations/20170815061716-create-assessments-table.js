'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('assessments', {
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
      gender: {
        type: Sequelize.STRING
      },
      backSquat: {
        type: Sequelize.INTEGER
      },
      fiveK: {
        type: Sequelize.INTEGER
      },
      pullingPushing: {
        type: Sequelize.INTEGER
      },
      overheadSquat: {
        type: Sequelize.INTEGER
      },
      wallballs: {
        type: Sequelize.INTEGER
      },
      snatch: {
        type: Sequelize.INTEGER
      },
      cleanAndJerk: {
        type: Sequelize.INTEGER
      },
      hoursInTheGym: {
        type: Sequelize.STRING
      },
      totalScore: {
        type: Sequelize.INTEGER
      },
      recommandedTrack: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('assessments');
  }
};