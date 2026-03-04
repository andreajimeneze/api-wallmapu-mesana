"use strict";

export const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Categories",
    {
      idCategory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_category",
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableNames: "wm_categories",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  Category.associate = (models) => {
    Category.hasMany(models.BookModel, {
      foreignKey: "categoryId",
      sourceKey: "idCategory",
      as: "book",
    });
  };

  return Category;
};
