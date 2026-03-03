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
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "book_id",
      },
      loanDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "loan_date",
      },
      returnDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "return_date",
      },
      loanStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "loan_status_id",
      },
      returnStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "return_status_id",
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
      tableName: "loans",
      timestamps: false,
    },
  );

  Loan.associate = (models) => {
    Loan.belongsTo(models.UserModel, {
      foreignKey: "userId",
      sourceKey: "idUser",
      as: "user",
    });

    Loan.belongsTo(models.BookModel, {
      foreignKey: "bookId",
      sourceKey: "idBook",
      as: "book",
    });

    Loan.belongsTo(models.LoanStatusModel, {
      foreignKey: "loanStatusId",
      sourceKey: "idLoanStatus",
      as: "loanStatus",
    });

    Loan.belongsTo(models.ReturnStatusModel, {
      foreignKey: "returnStatusId",
      sourceKey: "idReturnStatus",
      as: "returnStatus",
    });
  };

  return Loan;
};
