"use strict";

export const Commune = (sequelize, DataTypes) => {
  const Commune = sequelize.define(
    "Commune",
    {
      idCommune: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_commune",
      },
      commune: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      provinceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "province_id",
      }
    },
    {
      tableName: "wm_communes",
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
  );

  Commune.associate = (models) => {
    Commune.belongsTo(models.ProvinceModel, {
      foreignKey: "provinceId",
      targetKey: "idProvince",
      as: "province",
    });

    Commune.hasMany(models.UserModel, {
      foreignKey: 'communeId',
      sourceKey: 'idCommune',
      as: 'user'
    });
  };

  return Commune;
};
