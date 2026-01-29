"use strict";

export const Book = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Books",
    {
      id_book: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING,
      },
      ubication: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      book_cover: {
        type: DataTypes.STRING,
      },
      isbn: {
        type: DataTypes.STRING,
      },
      number_page: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      year_publication: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      edition_number: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "wm_books",
      timestamps: false,
    },
  );

  Book.associate = (models) => {
    Book.belongsTo(models.Category, {
      foreignKey: "category_id",
      targetKey: "id_category",
      as: "category",
    });

    Book.belongsTo(models.Author, {
      foreignKey: "author_id",
      targetKey: "id_author",
      as: "author",
    });
  };
  return Book;
};
