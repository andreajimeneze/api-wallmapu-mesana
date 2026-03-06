'use strict';

export const BookAuthor = (sequelize, DataTypes) => {
    const BookAuthor = sequelize.define('BookAuthor', {
        idBook: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'id_book',
            allowNull: false,
            references:
            {
                model: 'wm_books',
                key: 'id_book'
            }
        },
        idAuthor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'id_author',
            allowNull: false,
            references: {
                model: 'wm_authors',
                key: 'id_author'
            }
        }
    }, {
        tableName: 'wm_book_author',
        timestamps: true,
        created_at: 'created_at'
    })
    return BookAuthor;
}