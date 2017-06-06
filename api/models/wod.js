'use strict';
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Wod', {
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
		classMethods: {
			associate: function (models) {
				// associations can be defined here
			}
		}
	});
};