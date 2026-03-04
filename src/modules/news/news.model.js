"use strict";

export const News = (sequelize, DataTypes) => {
  const News = sequelize.define(
    "News",
    {
      idNews: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_news",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subtitle: {
        type: DataTypes.STRING,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "wm_news",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  News.associate = (models) => {
    News.hasMany(models.NewsGalleryModel, {
      foreignKey: "newsId",
      sourceKey: "idNews",
      as: "images",
    });
  };

  return News;
};
