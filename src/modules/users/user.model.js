"use strict";

export const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      idUser: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        field: "id_user",
      },
      username: {
        type: DataTypes.STRING
      },
      userlastname: {
        type: DataTypes.STRING
      },
      rut: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      communeId: {
        type: DataTypes.INTEGER,
        field: "commune_id"
      },
      phoneNumber: {
        type: DataTypes.STRING,
        field: "phone_number"
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING
      },
      userRoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_role_id"
      },
      userStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_status_id"
      }
    },
    {
      tableName: "wm_users",
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
  );

  User.associate = (models) => {
    User.belongsTo(models.UserStatusModel, {
      foreignKey: "userStatusId",
      targetKey: "idUserStatus",
      as: "userStatus",
    });

    User.belongsTo(models.UserRoleModel, {
      foreignKey: "userRoleId",
      targetKey: "idUserRole",
      as: "userRole",
    });

    User.belongsTo(models.CommuneModel, {
      foreignKey: "communeId",
      targetKey: "idCommune",
      as: "commune",
    });

    User.hasMany(models.ReservationModel, {
      foreignKey: 'userId',
      sourceKey: 'idUser',
      as: 'reservations'
    });

    User.hasMany(models.NotificationModel, {
      foreignKey: 'userId',
      sourceKey: 'idUser',
      as: 'notifications'
    })
  };

  return User;
};
