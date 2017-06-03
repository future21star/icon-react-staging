'use strict';

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('User', {
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
		classMethods: {
			associate: function (models) {
				// associations can be defined here
			}
		}
	});
};