'use strict';

export const Book = ( sequelize, DataTypes ) => {
    const Book = sequelize.define('Books', {
        title : DataTypes.STRING,
        category_id : DataTypes.INTEGER,
        author_id : DataTypes.INTEGER,
        summary : DataTypes.STRING,
        ubication : DataTypes.STRING,
        book_cover : DataTypes.STRING,
        isbn : DataTypes.STRING,
        number_page : DataTypes.INTEGER,
        year_publication : DataTypes.INTEGER,
        edition_number : DataTypes.STRING
    },{
        tableName : 'wm_books',
        timestamp : false
    });
    return Book;
}