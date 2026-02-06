"use strict";

export const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define("Categories", {
    id_category: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      foreignKey: "id_category",
      as: "book",
    });
  };
  
  return Category;
};
