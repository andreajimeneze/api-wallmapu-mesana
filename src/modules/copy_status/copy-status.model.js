"use strict";

export const CopyStatus = (sequelize, DataTypes) => {
  const CopyStatus = sequelize.define("CopyStatus", {
    idStatus: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_copy",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
{
  tableName: 'wm_copy_status',
  timestamps: false
});

return CopyStatus;
};
