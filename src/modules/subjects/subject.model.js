"use strict";

export const Subject = (sequelize, DataTypes) => {
  const Subject = sequelize.define(
    "Subjects",
    {
      idSubject: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_subject",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      tableName: "wm_subjects",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

    Subject.associate = (models) => {
      Subject.belongsToMany(models.BookModel, {
        through: "wm_book_subject",
        foreignKey: 'subject_id',
        otherKey: 'book_id',
        as: "books",
      });
   };

  return Subject;
};
