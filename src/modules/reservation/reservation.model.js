
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
            field: 'reservation_date'
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'expiration_date'
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
            default: 1,
            field: 'reservation_status_id'
        }
    },
        {
            tableName: 'wm_reservations',
            timestamps: false
        }
    );
    Reservation.associate = (models) => {
        Reservation.belongsTo(models.ReservationStatusModel, {
            foreignKey: 'reservationStatusId',
            targetKey: 'idStatus',
            as: 'reservationStatus'
        });
        Reservation.belongsTo(models.CopyModel, {
            foreignKey: 'copyId',
            targetKey: 'idCopy',
            as: 'copies'
        });
        Reservation.belongsTo(models.UserModel, {
            foreignKey: 'userId',
            targetKey: 'idUser',
            as: 'user'
        });
    };
    return Reservation
};