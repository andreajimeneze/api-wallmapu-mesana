'use strict';

export const User_status = (sequelize, DataTypes ) => {
    const User_status = sequelize.define('User_status', {
        user_status : DataTypes.STRING
    }, {
        tableName : 'wm_user_status',
        timestamps : false
    });
    return User_status;
}