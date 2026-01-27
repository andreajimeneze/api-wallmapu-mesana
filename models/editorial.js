'use strict';

export const Editorial = ( sequelize, DataTypes ) => {
    const Editorial = sequelize.define('Editorials', {
        editorial : DataTypes.STRING
    }, {
        tableName : 'wm_editorials',
        timestamps : false
    });
    return Editorial;
}