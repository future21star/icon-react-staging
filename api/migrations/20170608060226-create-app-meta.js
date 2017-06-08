module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.createTable('appMeta', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			key: {
				allowNull: false,
				type: Sequelize.STRING
			},
			value: {
				allowNull: false,
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
	down: function (queryInterface, Sequelize) {
		return queryInterface.dropTable('appMeta');
	}
};