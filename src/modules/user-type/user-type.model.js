"use strict";

export const User_type = (sequelize, DataTypes) => {
  const User_type = sequelize.define(
    "User_types",
    {
      id_user_type: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "wm_user_types",
      timestamps: false,
    },
  );

  User_type.associate = (models) => {
    User_type.hasMany(models.User, {
      foreignKey: "user_type_id",
      sourceKey: "id_user_type",
      as: "user",
    });
  };

  return User_type;
};
