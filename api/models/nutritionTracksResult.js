module.exports = function (sequelize, DataTypes) {
	const NutritionTracksResult = sequelize.define('NutritionTracksResult', {
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
		nutritionTrack: {
			type: DataTypes.STRING,
			allowNull: false
		},
		nutritionCalories: {
			type: DataTypes.STRING,
			allowNull: true
		},
		nutritionCarbs: {
			type: DataTypes.STRING,
			allowNull: true
		},
		nutritionProtein: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'nutritionTracksResult',
		classMethods: {
			associate: function (models) {
				NutritionTracksResult.belongsTo(models.User, {
					foreignKey: 'userId',
					as: 'user',
				});
			}
		}
	});

	return NutritionTracksResult;
};