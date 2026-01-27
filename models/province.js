'use strict';

export const Province = ( sequelize, DataTipes ) => {
    const Province = sequelize.define('Provinces', {
        province : DataTipes.STRING,
        region_id : DataTipes.INTEGER
    }, {
        tableName : 'provinces',
        timestamps : false
    });
    return Province;    
}