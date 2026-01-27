"use strict";

export const Return_status = (sequelize, DataTypes) => {
  const Return_status = sequelize.define(
    "Return_status",
    {
      id_return_status: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      return_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "wm_return_status",
      timestamps: false,
    },
  );
  return Return_status;
};
