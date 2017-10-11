'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.changeColumn(
			'wods',
			'intensity',
			{
				allowNull: false,
				type: Sequelize.STRING(500)
			}
		);
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.changeColumn(
			'wods',
			'intensity',
			{
				allowNull: false,
				type: Sequelize.STRING(30)
			}
		);
	}
};
