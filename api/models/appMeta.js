module.exports = function (sequelize, DataTypes) {
	const AppMeta = sequelize.define('AppMeta', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		key: {
			allowNull: false,
			type: DataTypes.STRING
		},
		value: {
			allowNull: false,
			type: DataTypes.STRING
		},
	}, {
		classMethods: {
			associate: function (models) {
				// associations can be defined here
			}
		}
	});
	return AppMeta;
};