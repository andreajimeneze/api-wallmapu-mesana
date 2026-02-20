"use strict";

export const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_user'
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
      idCommune: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_commune'
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'phone_number'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idUserRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_user_role'
      },
      idUserStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_user_status'
      },
    },
    {
      tableName: "wm_users",
      timestamp: false,
    },
  );

  User.associate = (models) => {
    User.belongsTo(models.UserStatusModel, {
      foreignKey: 'userStatusId' ,
      targetKey: "idUserStatus",
      as: "userStatus",
    });

    User.belongsTo(models.UserRoleModel, {
      foreignKey: "userRoleId",
      targetKey: "idUserRole",
      as: "userRole",
    });
  };

  return User;
};
