"use strict";

export const Copy = (sequelize, DataTypes) => {
  const Copy = sequelize.define("Copy", {
    idCopy: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_copy"
    },
    barcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    signatureTopography: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'signature_topography'
    },
    copyNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'copy_number'
    },
    editionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'edition_id'
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'status_id'
    }
  },
  {
      tableName: "wm_copies",
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
  }
);
return Copy;
};
