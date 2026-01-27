'use strict';

export const Author = ( sequelize, Datatypes ) => {
    const Author = sequelize.define('Authors', {
       name : Datatypes.STRING,
       lastname : Datatypes.STRING 
    } , {
        tableName : 'wm_author',
        timestamps : false
    });
    return Author
} 