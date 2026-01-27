'use strict';

export const Category = (sequelize, DataTypes ) => {
    const Category = sequelize.define('Categories', {
        category : DataTypes.STRING
    }, {
        tableNames : 'wm_categories',
        timestamps : false
    });
    return Category;
}