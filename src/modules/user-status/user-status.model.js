"use strict";

export const User_status = (sequelize, DataTypes) => {
  const User_status = sequelize.define(
    "User_status",
    {
      id_user_status: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "wm_user_status",
      timestamps: false,
    },
  );
  return User_status;
};
