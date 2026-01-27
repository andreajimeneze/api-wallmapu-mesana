'use strict';

export const News = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    id_news: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING
    },
    subtitle: {
      type: DataTypes.STRING
    },
    body: {
      type: DataTypes.TEXT
    },
    date: {
      type: DataTypes.DATE
    }
  }, {
    tableName: 'wm_news',
    timestamps: false   
  });

  return News;
};
