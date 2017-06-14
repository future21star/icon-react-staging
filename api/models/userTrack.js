module.exports = function (sequelize, DataTypes) {
	const UserTrack = sequelize.define('UserTrack', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		userId: {
			allowNull: false,
			type: DataTypes.INTEGER,
			references: {
				model: 'users',
				key: 'id'
			},
			onUpdate: 'cascade',
			onDelete: 'cascade'
		},
		trackName: {
			allowNull: false,
			type: DataTypes.STRING(30)
		}
	}, {
		tableName: 'userTracks',
		classMethods: {
			associate: function (models) {
				UserTrack.belongsTo(models.User, {
					foreignKey: 'userId',
					as: 'user',
				});
				UserTrack.belongsTo(models.Track, {
					foreignKey: 'trackName',
					sourceKey: 'name',
					as: 'userTracks',
				});
			}
		}
	});

	return UserTrack;
};