'use strict';

export const LoanPolicy = (sequelize, DataTypes) => {
    const LoanPolicy = sequelize.define(
        'LoanPolicy', {
        idPolicy: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_policy'
        },
        name: {
            type: DataTypes.STRING
        },
        maxBooks: {
            type: DataTypes.INTEGER,
            field: 'max_books'
        },
        maxDays: {
            type: DataTypes.INTEGER,
            field: 'max_days'
        },
        reservationDays: {
            type: DataTypes.INTEGER,
            default: 3,
            field: 'reservation_days'
        },
        finePerDay: {
            type: DataTypes.INTEGER,
            field: 'fine_per_day'
        }
    },
        {
            tableName: 'wm_loan_policies',
            timestamps: false
        }
    )
    return LoanPolicy;
}