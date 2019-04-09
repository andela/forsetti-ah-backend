'use strict';
module.exports = (sequelize, DataTypes) => {
  const ArticleTag = sequelize.define('ArticleTag', {
    tagId: DataTypes.UUID,
    articleId: DataTypes.UUID
  }, {});
  ArticleTag.associate = function(models) {
    // associations can be defined here
  };
  return ArticleTag;
};
