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
        allowNull: false,
      },
      book_id: {
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
      loan_status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      return_status_id: {
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
    Loan.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "id_user",
      as: "user",
    });

    Loan.belongsTo(models.Book, {
      foreignKey: "book_id",
      targetKey: "id_book",
      as: "book",
    });

    Loan.belongsTo(models.Loan_status, {
      foreignKey: "loan_status_id",
      targetKey: "id_loan_status",
      as: "loan_status",
    });

    Loan.belongsTo(models.Return_status, {
      foreignKey: "return_status_id",
      targetKey: "id_return_status",
      as: "return_status",
    });
  };

  return Loan;
};
