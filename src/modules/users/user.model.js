"use strict";

export const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "Users",
    {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userlastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rut: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      commun_id: {
        type: DataTypes.INTEGER,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "wm_users",
      timestamp: false,
    },
  );

  User.associate = (models) => {
    User.belongsTo(models.User_status, {
      foreignKey: "user_status_id",
      targetKey: "id_user_status",
      as: "user_status",
    });

    User.belongsTo(models.User_type, {
      foreignKey: "user_type_id",
      sourceKey: "id_user_type",
      as: "user_type",
    });
  };

  return User;
};
