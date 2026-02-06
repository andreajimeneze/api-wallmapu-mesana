"use strict";

export const Province = (sequelize, DataTypes) => {
  const Province = sequelize.define(
    "Provinces",
    {
      id_province: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      province: {
        type: DataTypes.STRING,
      },
      region_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "provinces",
      timestamps: false,
    },
  );

  Province.associate = (models) => {
    Province.belongsTo(models.CommunModel, {
      foreignKey: "id_province",
      as: "commun",
    });
  
    Province.hasMany(models.RegionModel, {
      foreignKey: "id_region",
      as: "region",
    });
  };

  return Province;
};
