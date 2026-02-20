"use strict";

export const Province = (sequelize, DataTypes) => {
  const Province = sequelize.define(
    "Province",
    {
      idProvince: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_province'
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false
      },
      regionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'region_id'
      },
      createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at'
    }
    },
    {
      tableName: "wm_provinces",
      timestamps: false,
    },
  );

  Province.associate = (models) => {
    Province.hasMany(models.CommuneModel, {
      foreignKey: "provinceId" ,
      sourceKey: "idProvince",
      as: "commune",
    });
  
    Province.belongsTo(models.RegionModel, {
      foreignKey:  "regionId",
      targetKey: "idRegion",
      as: "region",
    });
  };

  return Province;
};
