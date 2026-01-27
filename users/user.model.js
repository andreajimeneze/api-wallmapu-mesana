'use strict';

export const User = ( sequelize, DataTypes ) => {
    const User = sequelize.define('Users', {
              id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
        username : {
            type: DataTypes.STRING,
            allowNull: false
        },
        userlastname :  {
            type: DataTypes.STRING,
            allowNull: false
        },
        rut :  {
            type: DataTypes.STRING,
            allowNull: false
        },
        address :  {
            type: DataTypes.STRING,
            allowNull: false
        },
        commun_id :  {
            type: DataTypes.INTEGER
        },
        phone_number :  {
            type: DataTypes.STRING,
            allowNull: false
        },
        email :  {
            type: DataTypes.STRING,
            allowNull: false
        },
        password :  {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_type_id :  {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_status_id :  {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },{
        tableName : 'wm_users',
        timestamp : false
    });
    return User;
}