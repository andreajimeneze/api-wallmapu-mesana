'use strict';

export const News_gallery = ( sequelize, DataTypes ) => {
    const News_gallery = sequelize.define('News_gallery', {
        id_news_gallery: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        alt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img: {
           type: DataTypes.STRING,
           allowNull: false
        },
        id_news: {
            type: DataTypes.INTEGER,
            allowNull: false
        } 
    },{
        tableName : 'wm_news_gallery',
        timestamps : false
    });

    News_gallery.associate = (models) => {
        News_gallery.belongsTo(models.NewsModel, {
            foreignKey: 'id_news', 
            as: 'news'
        })
    }
    return News_gallery;
}