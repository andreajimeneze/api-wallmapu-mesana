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
      id_commun: {
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
      id_user_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_user_status: {
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
    User.belongsTo(models.User_statusModel, {
      foreignKey: "id_user_status",
      as: "user_status",
    });

    User.belongsTo(models.User_typeModel, {
      foreignKey: "id_user_type",
      as: "user_type",
    });
  };

  return User;
};
