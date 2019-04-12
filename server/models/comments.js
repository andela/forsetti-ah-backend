'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    articleId: {
      type: DataTypes.STRING,
      allowNull: false,
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
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      otherKey: 'articleId',
      as: 'usercomments',
      onDelete: 'CASCADE',
      timestamps: false
    });
    Comment.belongsTo(models.Article, {
      foreignKey: 'articleId',
      otherKey: 'userId',
      as: 'articlecomments',
      onDelete: 'CASCADE',
      timestamps: false
    });
    Comment.associate = (models) => {
      User.hasMany(models.CommentLike)
    };
  };
  return Comment;
};
