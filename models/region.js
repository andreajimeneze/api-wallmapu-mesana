'use strict';

export const Region = ( sequelize, DataTipes ) => {
    const Region = sequelize.define('Regions', {
        region : DataTipes.STRING,
    }, {
        tableName : 'wm_regions',
        timestamps : false
    });
    return Region;    
}