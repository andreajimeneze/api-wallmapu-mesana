
'use strict';

export const Reservation = (sequelize, DataTypes) => {
    const Reservation = sequelize.define(
        'Reservations', {
        idReservation: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_reservation'
        },
        reservationDate: {
            type: DataTypes.DATE,
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'user_id'
        },
        copyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'copy_id'
        },
        reservationStatusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1
        }
    },
        {
            tableName: 'wm_reservations',
            timestamps: false
        }
    )
    return Reservation
}