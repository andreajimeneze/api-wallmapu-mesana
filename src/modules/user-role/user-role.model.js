"use strict";

export const UserRole = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    "UserRole",
    {
      idUserRole: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_user_role",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      tableName: "wm_user_roles",
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
  );

  UserRole.associate = (models) => {
    UserRole.hasMany(models.UserModel, {
      foreignKey: 'userRoleId',
      sourceKey: "idUserRole",
      as: "user",
    });
  };

  return UserRole;
};
