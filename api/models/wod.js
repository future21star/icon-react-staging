module.exports = function (sequelize, DataTypes) {
	const Wod = sequelize.define('Wod', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		trackName: {
			allowNull: false,
			type: DataTypes.STRING(30)
		},
		format: {
			allowNull: false,
			type: DataTypes.STRING(30)
		},
		date: {
			allowNull: false,
			type: DataTypes.DATEONLY
		},
		notes: {
			allowNull: false,
			type: DataTypes.TEXT
		},
		duration: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		intensity: {
			allowNull: false,
			type: DataTypes.STRING(30)
		},
		focus: {
			allowNull: false,
			type: DataTypes.STRING(30)
		},
		warmUp: {
			allowNull: false,
			type: DataTypes.TEXT
		},
		mainWorkout: {
			allowNull: false,
			type: DataTypes.TEXT
		},
		coolDown: {
			allowNull: false,
			type: DataTypes.TEXT
		}
	}, {
		tableName: 'wods',
		classMethods: {
			associate: function (models) {
				Wod.belongsTo(models.Track, {
					foreignKey: 'trackName',
					targetKey: 'name',
					as: 'track',
				});
			}
		}
	});

	return Wod;
};