'use strict';
module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.createTable('wods', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			trackName: {
				allowNull: false,
				type: Sequelize.STRING(30)
			},
			date: {
				allowNull: false,
				type: Sequelize.DATEONLY
			},
			notes: {
				allowNull: false,
				type: Sequelize.TEXT
			},
			duration: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			intensity: {
				allowNull: false,
				type: Sequelize.STRING(30)
			},
			focus: {
				allowNull: false,
				type: Sequelize.STRING(30)
			},
			warmUp: {
				allowNull: false,
				type: Sequelize.TEXT
			},
			mainWorkout: {
				allowNull: false,
				type: Sequelize.TEXT
			},
			coolDown: {
				allowNull: false,
				type: Sequelize.TEXT
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
	down: function (queryInterface, Sequelize) {
		return queryInterface.dropTable('wods');
	}
};