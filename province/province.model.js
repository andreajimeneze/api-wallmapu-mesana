"use strict";

export const Province = (sequelize, DataTypes) => {
  const Province = sequelize.define(
    "Provinces",
    {
      id_province: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      province: {
        type: DataTypes.STRING,
      },
      region_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "provinces",
      timestamps: false,
    },
  );
  return Province;
};
