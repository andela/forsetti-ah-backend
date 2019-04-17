module.exports = (sequelize, DataTypes) => {
  const Clap = sequelize.define('Clap', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    articleId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  }, {});
  Clap.associate = (models) => {
    Clap.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE'
    })
  };
  return Clap;
};
