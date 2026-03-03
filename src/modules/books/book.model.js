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
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "category_id",
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "author_id",
      },
      summary: {
        type: DataTypes.STRING,
      },
      ubication: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookCover: {
        type: DataTypes.STRING,
        field: "book_cover",
      },
      isbn: {
        type: DataTypes.STRING,
      },
      numberPage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "number_page",
      },
      yearPublication: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "year_publication",
      },
      editionNumber: {
        type: DataTypes.STRING,
        field: "edition_number",
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
      tableName: "wm_books",
      timestamps: false,
    },
  );

  Book.associate = (models) => {
    Book.belongsTo(models.CategoryModel, {
      foreignKey: "categoryId",
      targetKey: "idCategory",
      as: "category",
    });

    Book.belongsTo(models.AuthorModel, {
      foreignKey: "authorId",
      targetKey: "idAuthor",
      as: "author",
    });
  };
  return Book;
};
