'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define('Tag', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    name: DataTypes.STRING
  }, {});
  Tags.associate = function(models) {
    // associations can be defined here
    Tags.belongsToMany(models.Article, { 
      foreignKey: 'tagId',
      through: 'ArticleTags',
      otherKey: 'articleId',
      timestamps: false,
    });
  };
  return Tags;
};
