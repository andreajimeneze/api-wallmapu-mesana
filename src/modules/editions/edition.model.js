"use strict";

export const Edition = (sequelize, DataTypes) => {
  const Edition = sequelize.define(
    "Edition",
    {
      idEdition: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_edition",
      },
      isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      publicationYear: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "publication_year",
      },
      pages: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coverImage: {
        type: DataTypes.STRING,
        field: "cover_image",
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "book_id",
      },
      editorialId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "editorial_id",
      },
    },
    {
      tableName: "wm_editions",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  Edition.associate = (models) => {
    Edition.hasMany(models.CopyModel, {
      foreignKey: 'editionId',
      sourceKey: 'idEdition',
      as: 'copy'
    })
    Edition.belongsTo(models.BookModel, {
      foreignKey: 'bookId',
      targetKey: 'idBook',
      as: 'book'
    })
    Edition.belongsTo(models.EditorialModel, {
      foreignKey: 'editorialId',
      targetKey: 'idEditorial',
      as: 'editorial'
    })

  }
  return Edition;
};
