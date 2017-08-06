module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.createTable('tracks', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			bgImgUrl: {
				allowNull: false,
				type: Sequelize.STRING
			},
			iconUrl: {
				allowNull: false,
				type: Sequelize.STRING
			},
			details: {
				allowNull: true,
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
		return queryInterface.dropTable('tracks');
	}
};