'use strict';

export const Author = ( sequelize, DataTypes ) => {
    const Author = sequelize.define('Authors', {
        id_author: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       name: {
        type: DataTypes.STRING,
        allowNull: false
       },
       lastname: {
        type: DataTypes.STRING,
        allowNull: false
    } , 
        tableName : 'wm_author',
        timestamps : false
    });

    Author.associate = (models) => {
    Author.hasMany(models.Book, {
      foreignKey: 'author_id', 
      sourceKey: 'id_author',   
      as: 'book'
    });
  };

    return Author
} 