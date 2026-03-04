"use strict";

export const Book = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      idBook: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_book",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "author_id",
      },
      summary: {
        type: DataTypes.STRING,
      },
      genreId: {
        type: DataTypes.STRING,
        field: "genre_id",
      }
    },
    {
      tableName: "wm_books",
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
  );

  // Book.associate = (models) => {
  //   Book.belongsTo(models.CategoryModel, {
  //     foreignKey: "categoryId",
  //     targetKey: "idCategory",
  //     as: "category",
  //   });
  //};
  return Book;
};
