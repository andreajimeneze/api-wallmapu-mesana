'use strict';

export const Notification = (sequelize, DataTypes) => {
    const Notification = sequelize.define(
        'Notifications', {
        idNotification: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_notification'
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isRead:
        {
            type: DataTypes.BOOLEAN,
            default: false
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'user_id'
        }
    },
        {
            tableName: 'wm_notifications',
            timestamps: true,
            createdAt: 'created_at',
        }
    );

    Notification.associate = (models) => {
        Notification.belongsTo(models.UserModel, {
            foreignKey: 'userId',
            targetKey: 'idUser',
            as: 'user'
        })
    }
    return Notification;
}