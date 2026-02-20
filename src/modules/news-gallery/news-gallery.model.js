'use strict';

export const NewsGallery = ( sequelize, DataTypes ) => {
    const NewsGallery = sequelize.define('NewsGallery', {
        idNewsGallery: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_news_gallery'
        },
        alt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
           type: DataTypes.STRING,
           allowNull: false
        },
        newsId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'news_id'
        } 
    },{
        tableName : 'wm_news_gallery',
        timestamps : false
    });

    NewsGallery.associate = (models) => {
        NewsGallery.belongsTo(models.NewsModel, {
            foreignKey: 'newsId', 
            targetKey: 'id_news',
            as: 'news',
            onDelete: 'CASCADE'
        })
    }
    return NewsGallery;
}