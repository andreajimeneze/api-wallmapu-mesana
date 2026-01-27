'use strict';

export const Loan = ( sequelize, DataTypes ) => {
    const Loan = sequelize.define('Loans', {
        user_id : DataTypes.INTEGER,
        book_id : DataTypes.INTEGER,
        loan_date : DataTypes.DATE,
        return_date : DataTypes.DATE,
        loan_status_id : DataTypes.INTEGER,
        return_status_id : DataTypes.INTEGER
    }, {
        tableName : 'loans',
        timestamps : false
    });
    return Loan;
}