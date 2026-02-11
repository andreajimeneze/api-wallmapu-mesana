'use strict';

export const News = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    id_news: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'wm_news',
    timestamps: false   
  });

  News.associate = (models) => {
    News.hasMany(models.News_galleryModel, {
        foreignKey: 'news_id',
        sourceKey: 'id_news',
        as: 'images'
    });
};

  return News;
};
