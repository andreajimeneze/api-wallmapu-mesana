'use strict';

export const News = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    idNews: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_news'
    },
    title: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    subtitle: {
      type: DataTypes.STRING     
    },
    body: {
      type: DataTypes.TEXT,
       allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'
    }
  }, {
    tableName: 'wm_news',
    timestamps: false   
  });

  News.associate = (models) => {
    News.hasMany(models.NewsGalleryModel, {
        foreignKey: 'newsId',
        sourceKey: 'idNews',
        as: 'images'
    });
};

  return News;
};
