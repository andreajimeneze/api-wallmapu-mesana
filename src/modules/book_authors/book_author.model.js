'use strict';

export const BookAuthor = (sequelize, DataTypes) => {
    const BookAuthor = sequelize.define('BookAuthor', {
        bookId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'book_id',
            allowNull: false,
            references:
            {
                model: 'wm_books',
                key: 'id_book'
            }
        },
        authorId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'author_id',
            allowNull: false,
            references: {
                model: 'wm_authors',
                key: 'id_author'
            }
        }
    }, {
        tableName: 'wm_book_author',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false
    })
    return BookAuthor;
}