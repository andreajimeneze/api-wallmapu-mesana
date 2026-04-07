"use strict";

export const Copy = (sequelize, DataTypes) => {
  const Copy = sequelize.define(
    "Copy",
    {
      idCopy: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_copy",
      },
      barcode: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      signatureTopography: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "signature_topography",
      },
      copyNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "copy_number",
      },
      editionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "edition_id",
      },
      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "status_id",
      },
    },
    {
      tableName: "wm_copies",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  Copy.associate = (models) => {
    Copy.belongsTo(models.EditionModel, {
      foreignKey: "editionId",
      targetKey: "idEdition",
      as: "editions",
    });

    Copy.belongsTo(models.CopyStatusModel, {
      foreignKey: "statusId",
      targetKey: "idStatus",
      as: "status",
    });

    Copy.hasMany(models.ReservationModel, {
      foreignKey: 'copyId',
      sourceKey: 'idCopy',
      as: 'reservations'
    })
  };
  return Copy;
};
