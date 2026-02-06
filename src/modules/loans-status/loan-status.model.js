"use strict";

export const Loan_status = (sequelize, DataTypes) => {
  const Loan_status = sequelize.define(
    "Loan_status",
    {
      loan_status: DataTypes.STRING,
    },
    {
      tableName: "loan_status",
      timestamps: false,
    },
  );

  Loan_status.associate = (models) => {
    Loan_status.hasMany(models.LoanModel, {
      foreignKey: "id_loan_status",
      as: "loan",
    });
  };

  return Loan_status;
};
