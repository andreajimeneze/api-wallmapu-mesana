"use strict";

export const Editorial = (sequelize, DataTypes) => {
  const Editorial = sequelize.define(
    "Editorial",
    {
      idEditorial: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_editorial'
      },
      name: {
        type: DataTypes.STRING,
      }
    },
    {
      tableName: "wm_editorials",
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
  );

  Editorial.associate = (models) => {
    Editorial.hasMany(models.BookModel, {
      foreignKey: "idEditorial",
      sourcekey: 'editorialId',
      as: "book",
    });
  };

  return Editorial;
};
