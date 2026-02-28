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
      tableName: "wm_communes",
      timestamps: false,
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
