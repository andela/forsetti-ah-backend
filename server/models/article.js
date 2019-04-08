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
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    userId: {
      type: DataTypes.UUID
    },
  }, {});
  Article.associate = (models) => {
    Article.belongsTo(models.User, {
      foreignkey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Article;
};
