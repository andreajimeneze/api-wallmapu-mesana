'use strict';

export const News_gallery = ( sequelize, DataTypes ) => {
    const News = sequelize.define('News_gallery', {
        alt : DataTypes.STRING,
        url : DataTypes.STRING,
        news_id : DataTypes.INTEGER
    },{
        tableName : 'wm_news_gallery',
        timestamp : false
    });
    return News_gallery;
}