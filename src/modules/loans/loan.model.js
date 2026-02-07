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
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_book: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      loan_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      return_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      id_loan_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_return_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "loans",
      timestamps: false,
    },
  );

  Loan.associate = (models) => {
    Loan.belongsTo(models.UserModel, {
      foreignKey: "id_user",
      as: "user",
    });

    Loan.belongsTo(models.BookModel, {
      foreignKey: "id_book",
      as: "book",
    });

    Loan.belongsTo(models.Loan_statusModel, {
      foreignKey: "id_loan_status",
      as: "loan_status",
    });

    Loan.belongsTo(models.Return_statusModel, {
      foreignKey: "id_return_status",
      as: "return_status",
    });
  };

  return Loan;
};
