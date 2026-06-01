"use strict";

export const EditionFormat = (sequelize, DataTypes) => {
  const EditionFormat = sequelize.define(
    "EditionFormat",
    {
      idEdition: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "id_edition",
        allowNull: false,
        references: {
          model: "wm_editions",
          key: "id_edition",
        },
      },
      idFormat: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "id_format",
        allowNull: false,
        references: {
          model: "wm_formats",
          key: "id_format",
        },
      },
    },
    {
      tableName: "wm_edition_format",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    },
  );

  return EditionFormat;
};
