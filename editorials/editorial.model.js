"use strict";

export const Editorial = (sequelize, DataTypes) => {
  const Editorial = sequelize.define(
    "Editorials",
    {
      id_editorial: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      editorial: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "wm_editorials",
      timestamps: false,
    },
  );
  return Editorial;
};
