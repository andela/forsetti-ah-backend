'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentLike = sequelize.define('CommentLike', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    commentid: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'comments',
        key: 'id',
        as: 'commentid',
      }
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
    }
  }, {});
  CommentLike.associate = function(models) {
    CommentLike.belongsTo(models.User, {
      foreignKey: 'userid',
      as: 'user',
    });
    CommentLike.belongsTo(models.Comment, {
      foreignKey: 'commentid',
      as: 'comment',
    });
  };
  return CommentLike;
};
