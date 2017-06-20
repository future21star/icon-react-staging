module.exports = function (sequelize, DataTypes) {
	const Track = sequelize.define('Track', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING
		},
		bgImgUrl: {
			allowNull: false,
			type: DataTypes.STRING
		},
		iconUrl: {
			allowNull: false,
			type: DataTypes.STRING
		},
	}, {
		tableName: 'tracks',
		classMethods: {
			associate: function (models) {
				Track.hasMany(models.UserTrack, {
					foreignKey: 'trackName',
					sourceKey: 'name',
					as: 'userTracks',
				});
			}
		}
	});
	return Track;
};