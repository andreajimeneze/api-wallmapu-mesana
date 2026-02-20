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
      role: {
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
      tableName: "wm_user_role",
      timestamps: false,
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
