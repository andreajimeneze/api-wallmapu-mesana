"use strict";

export const Commun = (sequelize, DataTypes) => {
  const Commun = sequelize.define(
    "Communs",
    {
      id_commun: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comuna: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      provincia_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "wm_communs",
      timestamps: false,
    },
  );

  Commun.associate = (models) => {
    Commun.belongsTo(models.ProvinceModel, {
        foreignKey: 'id_province',
        as: 'province'
    });
  };
  
  return Commun;
};
