'use strict';

export const Loan_status = (sequelize, DataTypes ) => {
    const Loan_status = sequelize.define('Loan_status', {
        loan_status : DataTypes.STRING
    }, {
        tableName : 'loan_status',
        timestamps : false
    });
    return Loan_status;
}