'use strict';

export const Commun = ( sequelize, DataTipes ) => {
    const Commun = sequelize.define('Communs', {
        comuna : DataTipes.STRING,
        provincia_id : DataTipes.INTEGER
    }, {
        tableName : 'wm_communs',
        timestamps : false
    });
    return Commun;    
}