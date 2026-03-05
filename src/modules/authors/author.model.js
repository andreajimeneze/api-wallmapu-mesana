"use strict";

export const Author = (sequelize, DataTypes) => {
  const Author = sequelize.define(
    "Author",
    {
      idAuthor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_author",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }  
    },
    {
      tableName: "wm_authors",
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
  );

  Author.associate = (models) => {
    Author.belongsToMany(models.BookModel, {
      through: 'book_author',
      as: 'book'
    })
  };

  return Author;
};
