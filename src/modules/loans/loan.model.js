"use strict";

export const Loan = (sequelize, DataTypes) => {
  const Loan = sequelize.define(
    "Loans",
    {
      idLoan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_loan",
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "user_id",
      },
      loanDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "loan_date",
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "due_date",
      },
      returnDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "return_date",
      },
      loanStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'loan_status_id'
      },
      copyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "copy_id",
      }
    },
    {
      tableName: "wm_loans",
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
  );

  Loan.associate = (models) => {
    Loan.belongsTo(models.UserModel, {
      foreignKey: "userId",
      sourceKey: "idUser",
      as: "user",
    });
    Loan.belongsTo(models.CopyModel, {
      foreignKey: "copyId",
      sourceKey: "idCopy",
      as: "copy",
    });

    Loan.belongsTo(models.LoanStatusModel, {
      foreignKey: 'loanStatusId',
      sourceKey: 'idLoanStatus',
      as: 'loanStatus'
    })
  };

  return Loan;
};
