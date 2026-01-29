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
    Loan_status.hasMany(models.Loan, {
      foreignKey: "loan_status_id",
      sourceKey: "id_loan_status",
      as: "loan",
    });
  };

  return Loan_status;
};
