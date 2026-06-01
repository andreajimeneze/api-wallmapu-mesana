"use strict";

export const Format = (sequelize, DataTypes) => {
  const Format = sequelize.define(
    "Formats",
    {
      idFormat: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_format",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      tableName: "wm_formats",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

    Format.associate = (models) => {
      Format.belongsToMany(models.EditionModel, {
        through: "wm_edition_format",
        foreignKey: 'idFormat',
        otherKey: 'idEdition',
        as: "edition",
      });
   };

  return Format;
};
