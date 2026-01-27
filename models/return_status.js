'use strict';

export const Return_status = (sequelize, DataTypes ) => {
    const Return_status = sequelize.define('Return_status', {
        return_status : DataTypes.STRING
    }, {
        tableName : 'wm_return_status',
        timestamps : false
    });
    return Return_status;
}