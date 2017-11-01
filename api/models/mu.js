'use strict';
module.exports = function(sequelize, DataTypes) {
  const MU = sequelize.define('mu', {
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
	  q1: {
		  type: DataTypes.STRING
	  },
	  createdAt: {
		  allowNull: false,
		  type: DataTypes.DATE
	  },
	  updatedAt: {
		  allowNull: false,
		  type: DataTypes.DATE
	  }
  }, {
    tableName: 'mu',
    classMethods: {
      associate: function (models) {
	      MU.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user',
        });
      }
    }
  });

  return MU;
};