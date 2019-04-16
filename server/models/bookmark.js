module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    articleId: {
     type: DataTypes.UUID,
     allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
     allowNull: false
    }
  }, {});
  Bookmark.associate = function(models) {
    Bookmark.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Bookmark.belongsTo(models.Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });

  };
  return Bookmark;
};
