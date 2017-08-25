'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users', 
      'nutritionSelectedTrack', 
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'nutritionSelectedTrack')
  }
};
