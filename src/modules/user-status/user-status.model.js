"use strict";

export const UserStatus = (sequelize, DataTypes) => {
  const UserStatus = sequelize.define(
    "UserStatus",
    {
      idUserStatus: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_user_status",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
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
      },
    },
    {
      tableName: "wm_user_status",
      timestamps: false,
    },
  );

  UserStatus.associate = (models) => {
    UserStatus.hasMany(models.UserModel, {
      foreignKey:  'userStatusId' ,
      targetKey: "idUserStatus",
      as: "user",
    });
  };

  return UserStatus;
};
