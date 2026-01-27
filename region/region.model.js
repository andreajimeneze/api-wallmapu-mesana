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
  return Region;
};
