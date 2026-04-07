'use strict';

export const ReservationStatus = (sequelize, DataTypes) => {
    const ReservationStatus = sequelize.define(
        'ReservationStatus', {
            idStatus: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'id_status'
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'wm_reservation_status',
            timestamps: false
        }
    );

    ReservationStatus.associate = (models) => {
        ReservationStatus.hasMany(models.ReservationModel, {
            foreignKey: 'statusId',
            sourceKey: 'idStatus',
            as: 'reservations'
        })
    }
    return ReservationStatus;
}