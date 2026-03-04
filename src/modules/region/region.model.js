"use strict";

export const Region = (sequelize, DataTypes) => {
  const Region = sequelize.define(
    "Region",
    {
      idRegion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_region",
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      tableName: "wm_regions",
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
  );

  Region.associate = (models) => {
    Region.hasMany(models.ProvinceModel, {
      foreignKey: 'regionId' ,
      sourceKey: "idRegion",
      as: "province",
    });
  };

  return Region;
};
