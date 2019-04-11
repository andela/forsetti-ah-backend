module.exports = (sequelize, DataTypes) => {
  const Readstat = sequelize.define(
    'Readstat',
    {
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
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Readstat.associate = (models) => {
    Readstat.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Readstat.belongsTo(models.Article, {
      foreignKey: 'articleId'
    });
  };
  return Readstat;
};
