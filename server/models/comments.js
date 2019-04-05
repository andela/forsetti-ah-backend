'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    userid: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'User',
        key: 'id',
        as: 'userid',
      }
    },
    articleid: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Article',
        key: 'id',
        as: 'articleid',
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
    }
  }, {});
  comments.associate = function(models) {
    comments.belongsTo(models.User, {
      foreignKey: 'userid',
      otherKey: 'articleid',
      through: 'comments',
      as: 'userComments',
      timestamps: false
    });
    comments.belongsTo(models.Article, {
      foreignKey: 'articleid',
      otherKey: 'userid',
      through: 'comments',
      as: 'articleComments',
      timestamps: false
    });
  };
  return comments;
};
