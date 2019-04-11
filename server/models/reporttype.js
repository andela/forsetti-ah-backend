'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReportType = sequelize.define('ReportType', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  ReportType.associate = function (models) {
    // associations can be defined here
    ReportType.hasMany(models.Report, {
      foreignKey: 'typeId',
    });
  };
  return ReportType;
};