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
      tableName: "wm_return_status",
      timestamps: false,
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
