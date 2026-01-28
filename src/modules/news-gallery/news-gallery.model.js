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

    News_gallery.associate = (models) => {
        News_gallery.belongsTo(models.News, {
            foreignKey: 'news_id', 
            targetKey: 'id_news',
            as: 'news'
        })
    }
    return News_gallery;
}