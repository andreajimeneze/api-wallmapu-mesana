"use strict";

export const Genre = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    "Genre",
    {
      idGenre: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_genre",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "wm_genres",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  Genre.associate = (models) => {
    Genre.hasMany(models.BookModel, {
        foreignKey: 'genreId',
        sourceKey: 'idGenre',
        as: 'book'
    })
  }
  return Genre;
};
