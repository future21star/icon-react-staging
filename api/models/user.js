module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define('User', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		wpUserId: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.INTEGER
		}
	}, {
		tableName: 'users',
		classMethods: {
			associate: function (models) {
				User.hasMany(models.UserTrack, {
					foreignKey: 'userId',
					as: 'userTracks',
				});
			}
		}
	});

	return User;
};