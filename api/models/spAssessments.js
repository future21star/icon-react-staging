'use strict';
module.exports = function(sequelize, DataTypes) {
  const SpAssessment = sequelize.define('SpAssessment', {
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
	  evaluation: {
		  type: DataTypes.STRING
	  },
	  questionSerial: {
		  type: DataTypes.STRING(3)
	  },
	  questionText: {
		  type: DataTypes.STRING
	  },
	  answerValue: {
		  type: DataTypes.STRING(20)
	  },
	  answerText: {
		  type: DataTypes.STRING
	  }
  }, {
    tableName: 'spAssessments',
    classMethods: {
      associate: function (models) {
	      SpAssessment.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user',
        });
      }
    }
  });

  return SpAssessment;
};