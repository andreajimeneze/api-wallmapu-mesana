"use strict";

export const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define("Categories", {
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
    tableNames: "wm_categories",
    timestamps: false,
  });

  Category.associate = (models) => {
    Category.hasMany(models.BookModel, {
      foreignKey: "categoryId",
      sourceKey: "idCategory",
      as: "book",
    });
  };

  return Category;
};
