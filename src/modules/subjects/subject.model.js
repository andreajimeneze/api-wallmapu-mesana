"use strict";

export const Subject = (sequelize, DataTypes) => {
  const Subject = sequelize.define(
    "Subject",
    {
      idSubject: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_subject",
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "wm_subjects",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  //   Subject.associate = (models) => {
  //     Subject.hasMany(models.BookModel, {
  //       foreignKey: "subjectId",
  //       sourceKey: "idSubject",
  //       as: "book",
  //     });
  //  };

  return Subject;
};
