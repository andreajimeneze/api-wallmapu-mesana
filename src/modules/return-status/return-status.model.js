"use strict";

export const Return_status = (sequelize, DataTypes) => {
  const Return_status = sequelize.define(
    "Return_status",
    {
      id_return_status: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      return_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "wm_return_status",
      timestamps: false,
    },
  );

  Return_status.associate = (models) => {
    Return_status.hasMany(models.Loan, {
      foreignKey: "return_status_id",
      sourceKey: "id_return_status",
      as: "loan",
    });
  };

  return Return_status;
};
