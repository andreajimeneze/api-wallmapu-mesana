'use strict';

export const User_type = ( sequelize, DataTypes ) => {
    const User_type = sequelize.define('User_types', {
        user_type : DataTypes.STRING
    }, {
        tableName : 'wm_user_types',
        timestamps : false
    });
    return User_type;
}