module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  Article.associate = (models) => {};
  return Article;
};
