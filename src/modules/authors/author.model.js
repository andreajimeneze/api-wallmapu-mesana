'use strict';

export const Author = ( sequelize, DataTypes ) => {
    const Author = sequelize.define('Author', {
        idAuthor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_author'
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
      foreignKey: 'authorId',  
      sourceKey: 'idAuthor',
      as: 'book'
    });
  };

    return Author
} 