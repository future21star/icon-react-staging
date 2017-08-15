'use strict';
module.exports = function(sequelize, DataTypes) {
  const Assessment = sequelize.define('Assessment', {
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
      gender: {
        type: DataTypes.STRING
      },
      backSquat: {
        type: DataTypes.INTEGER
      },
      fiveK: {
        type: DataTypes.INTEGER
      },
      pullingPushing: {
        type: DataTypes.INTEGER
      },
      overheadSquat: {
        type: DataTypes.INTEGER
      },
      wallballs: {
        type: DataTypes.INTEGER
      },
      snatch: {
        type: DataTypes.INTEGER
      },
      cleanAndJerk: {
        type: DataTypes.INTEGER
      },
      hoursInTheGym: {
        type: DataTypes.STRING
      },
      totalScore: {
        type: DataTypes.INTEGER
      },
      recommandedTrack: {
        type: DataTypes.STRING
      }
  }, {
    tableName: 'assessments',
    classMethods: {
      associate: function (models) {
        Assessment.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user',
        });
      }
    }
  });

  return Assessment;
};