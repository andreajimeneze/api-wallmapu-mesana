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
      tableName: "wm_authors",
      timestamps: false,
    },
  );

  Author.associate = (models) => {
    Author.hasMany(models.BookModel, {
      foreignKey: "authorId",
      sourceKey: "idAuthor",
      as: "book",
    });
  };

  return Author;
};
