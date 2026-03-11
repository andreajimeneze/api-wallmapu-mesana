"use strict";

export const BookSubject = (sequelize, DataTypes) => {
  const BookSubject = sequelize.define(
    "BookSubject",
    {
      bookId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "book_id",
        allowNull: false,
        references: {
          model: "wm_books",
          key: "id_book",
        },
      },
      subjectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "subject_id",
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
