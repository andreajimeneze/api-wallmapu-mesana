'use strict';

export const News_gallery = ( sequelize, DataTypes ) => {
    const News = sequelize.define('News_gallery', {
        id_news_gallery: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        alt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
           type: DataTypes.STRING,
           allowNull: false
        },
        news_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        } 
    },{
        tableName : 'wm_news_gallery',
        timestamp : false
    });
    return News_gallery;
}