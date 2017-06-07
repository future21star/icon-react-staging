'use strict';
module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.createTable('userTracks', {
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
			trackName: {
				allowNull: false,
				type: Sequelize.STRING(30)
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
		return queryInterface.dropTable('userTracks');
	}
};