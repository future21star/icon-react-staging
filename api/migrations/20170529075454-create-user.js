'use strict';
module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			wpUserId: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			gender: {
				allowNull: true,
				type: Sequelize.STRING(10),
				defaultValue: null
			},
			heightFt: {
				allowNull: true,
				type: Sequelize.INTEGER,
				defaultValue: null
			},
			heightIn: {
				allowNull: true,
				type: Sequelize.INTEGER,
				defaultValue: null
			},
			weight: {
				allowNull: true,
				type: Sequelize.INTEGER,
				defaultValue: null
			},
			accessToken: {
				allowNull: true,
				type: Sequelize.STRING,
				defaultValue: null
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
		return queryInterface.dropTable('Users');
	}
};