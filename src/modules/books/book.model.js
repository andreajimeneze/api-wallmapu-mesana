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
      as: "editions",
    });

    Book.belongsToMany(models.AuthorModel, {
      through: models.BookAuthorModel,
      foreignKey: 'idBook',
      otherKey: 'idAuthor',
      as: 'authors'
    });

    Book.belongsToMany(models.SubjectModel, {
      through: models.BookSubjectModel,
      foreignKey: 'idBook',
      otherKey: 'idSubject',
      as: 'subjects'
    })
  };
  
  return Book;
};
