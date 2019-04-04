module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
      type: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    }, {});
  Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: 'roleId'
    });
  };
  return Role;
};
