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
		},
		gender: {
			allowNull: true,
			type: DataTypes.STRING(10),
			defaultValue: null
		},
		heightFt: {
			allowNull: true,
			type: DataTypes.INTEGER,
			defaultValue: null
		},
		heightIn: {
			allowNull: true,
			type: DataTypes.INTEGER,
			defaultValue: null
		},
		weight: {
			allowNull: true,
			type: DataTypes.INTEGER,
			defaultValue: null
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