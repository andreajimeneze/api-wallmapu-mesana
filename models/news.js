'use strict';

export const News = ( sequelize, DataTypes ) => {
    const News = sequelize.define('News', {
        title : DataTypes.STRING,
        subtitle : DataTypes.STRING,
        body : DataTypes.STRING,
        address : DataTypes.STRING,
        date : DataTypes.DATE
    },{
        tableName : 'wm_news',
        timestamp : false
    });
    return News;
}