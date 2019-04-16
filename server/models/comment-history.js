'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentHistory = sequelize.define('CommentHistory', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    commentId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  }, {});
  CommentHistory.associate = function (models) {
    // associations can be defined here
  };
  return CommentHistory;
};
