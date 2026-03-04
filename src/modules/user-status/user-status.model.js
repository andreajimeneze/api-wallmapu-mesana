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
      }
    },
    {
      tableName: "wm_user_status",
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
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
