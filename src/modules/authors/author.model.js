'use strict';

export const Author = ( sequelize, DataTypes ) => {
    const Author = sequelize.define('Author', {
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
    Author.hasMany(models.BookModel, {
      foreignKey: 'id_author',  
      as: 'book'
    });
  };

    return Author
} 