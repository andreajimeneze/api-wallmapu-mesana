"use strict";

export const Region = (sequelize, DataTypes) => {
  const Region = sequelize.define(
    "Regions",
    {
      id_region: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      region: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "wm_regions",
      timestamps: false,
    },
  );

  Region.associate = (models) => {
    Region.hasMany(models.Province, {
      foreignKey: "region_id",
      sourceKey: "id_region",
      as: "province",
    });
  };

  return Region;
};
