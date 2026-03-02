"use strict";

export const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define("Categories", {
    idCategory: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_category'
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tableNames: "wm_categories",
    timestamps: false,
  });

  Category.associate = (models) => {
    Category.hasMany(models.BookModel, {
      foreignKey: "categoryId",
      sourceKey: 'idCategory',
      as: "book",
    });
  };
  
  return Category;
};
