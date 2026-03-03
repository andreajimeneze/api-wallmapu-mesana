"use strict";

export const LoanStatus = (sequelize, DataTypes) => {
  const LoanStatus = sequelize.define(
    "LoanStatus",
    {
      idLoanStatus: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_loan_status",
      },

      loanStatus: {
        type: DataTypes.STRING,
        field: "loan_status",
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "updated_at",
      },
    },
    {
      tableName: "loan_status",
      timestamps: false,
    },
  );

  LoanStatus.associate = (models) => {
    LoanStatus.hasMany(models.LoanModel, {
      foreignKey: "loanStatusId",
      sourceKey: "idLoanStatus",
      as: "loan",
    });
  };

  return LoanStatus;
};
