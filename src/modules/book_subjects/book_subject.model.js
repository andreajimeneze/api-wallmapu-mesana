"use strict";

export const BookSubject = (sequelize, DataTypes) => {
  const BookSubject = sequelize.define(
    "BookSubject",
    {
      idBook: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "id_book",
        allowNull: false,
        references: {
          model: "wm_books",
          key: "id_book",
        },
      },
      idSubject: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "id_subject",
        allowNull: false,
        references: {
          model: "wm_subjects",
          key: "id_subject",
        },
      },
    },
    {
      tableName: "wm_book_subject",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    },
  );

  return BookSubject;
};
