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
      communeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'commune_id'
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
      userRoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_role_id'
      },
      userStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_status_id'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "updated_at",
      }
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

    User.belongsTo(models.CommuneModel, {
       foreignKey: 'communeId' ,
      targetKey: "idCommune",
      as: "commune",
    })
  };

  return User;
};
