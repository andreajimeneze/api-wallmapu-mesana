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
      summary: {
        type: DataTypes.STRING,
      },
      genreId: {
        type: DataTypes.STRING,
        field: "genre_id",
      },
    },
    {
      tableName: "wm_books",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  Book.associate = (models) => {
    Book.belongsTo(models.GenreModel, {
      foreignKey: "genreId",
      targetKey: "idGenre",
      as: "genre",
    });

    Book.hasMany(models.EditionModel, {
      foreignKey: "bookId",
      sourceKey: "idBook",
      as: "edition",
    });

    Book.belongsToMany(models.AuthorModel, {
      through: 'book_author',
      as: 'author'
    })
  };
  
  return Book;
};
