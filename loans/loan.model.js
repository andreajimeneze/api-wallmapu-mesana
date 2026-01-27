"use strict";

export const Loan = (sequelize, DataTypes) => {
  const Loan = sequelize.define(
    "Loans",
    {
      id_loan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }, 
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      loan_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      return_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      loan_status_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      return_status_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "loans",
      timestamps: false,
    },
  );
  return Loan;
};
