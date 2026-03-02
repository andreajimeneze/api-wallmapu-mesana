"use strict";

export const Editorial = (sequelize, DataTypes) => {
  const Editorial = sequelize.define(
    "Editorials",
    {
      idEditorial: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_editorial'
      },
      editorial: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "wm_editorials",
      timestamps: false,
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
