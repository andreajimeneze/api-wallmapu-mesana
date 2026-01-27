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
    return Author
} 