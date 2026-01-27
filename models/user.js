'use strict';

export const User = ( sequelize, DataTypes ) => {
    const User = sequelize.define('Users', {
        username : DataTypes.STRING,
        userlastname : DataTypes.STRING,
        rut : DataTypes.STRING,
        address : DataTypes.STRING,
        commun_id : DataTypes.INTEGER,
        phone_number : DataTypes.STRING,
        email : DataTypes.STRING,
        password : DataTypes.STRING,
        user_type_id : DataTypes.INTEGER,
        user_status_id : DataTypes.INTEGER
    },{
        tableName : 'wm_users',
        timestamp : false
    });
    return User;
}