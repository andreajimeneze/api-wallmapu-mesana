"use strict";

export const LoanStatus = (sequelize, DataTypes) => {
  const LoanStatus = sequelize.define(
    "LoanStatus",
    {
      idLoanStatus: DataTypes.INTEGER,
      primaryKey: true,
        autoIncrement: true,
        field: 'id_loan_status'
    },
    {
      loanStatus: DataTypes.STRING,
      field: 'loan_status'
    },
    {
      tableName: "loan_status",
      timestamps: false,
    },
  );

  LoanStatus.associate = (models) => {
    LoanStatus.hasMany(models.LoanModel, {
      foreignKey: "loanStatusId",
      sourceKey: 'idLoanStatus'   ,
      as: "loan",
    });
  };

  return LoanStatus;
};
