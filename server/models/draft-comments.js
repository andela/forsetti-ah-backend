'use strict';
module.exports = (sequelize, DataTypes) => {
  const DraftComment = sequelize.define('DraftComment', {
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
  DraftComment.associate = (models) => {
    DraftComment.belongsTo(models.User, {
      foreignKey: 'userId',
      otherKey: 'articleId',
      as: 'userdraftcomments',
      onDelete: 'CASCADE',
      timestamps: false
    });
    DraftComment.belongsTo(models.Article, {
      foreignKey: 'articleId',
      otherKey: 'userId',
      as: 'articledraftcomments',
      onDelete: 'CASCADE',
      timestamps: false
    });
  };
  return DraftComment;
};
