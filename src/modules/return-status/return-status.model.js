"use strict";

export const ReturnStatus = (sequelize, DataTypes) => {
  const ReturnStatus = sequelize.define(
    "ReturnStatus",
    {
      idReturnStatus: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_return_status",
      },
      returnStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "return_status",
      },
    },
    {
      tableName: "wm_return_status",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  ReturnStatus.associate = (models) => {
    ReturnStatus.hasMany(models.LoanModel, {
      foreignKey: "returnStatusId",
      targetKey: "id_return_status",
      as: "loan",
    });
  };

  return ReturnStatus;
};
