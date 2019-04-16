module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tagList: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    userId: {
      type: DataTypes.UUID
    },
  }, {});
  Article.associate = (models) => {
    Article.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
      onDelete: 'CASCADE'
    });
    Article.hasMany(models.Comment, {
      foreignKey: 'articleId',
      as: 'articlecomments'
    });
    Article.hasMany(models.DraftComment, {
      foreignKey: 'articleId',
      as: 'articledraftcomments'
    });
    Article.hasMany(models.Readstat, {
      foreignKey: 'articleId',
      as: 'comments',
      onDelete: 'CASCADE'
    });
    Article.hasMany(models.DraftComment, {
      foreignKey: 'articleId',
      as: 'draftcomments',
      onDelete: 'CASCADE'
    });
    Article.belongsToMany(models.Tag, {
      foreignKey: 'articleId',
      as: 'tags',
      through: 'ArticleTags',
      otherKey: 'tagId',
      onDelete: 'CASCADE'
    });

    Article.hasMany(models.Bookmark, {
      foreignKey: 'articleId',
      otherKey: 'userId'
    })
  };
  return Article;
};
