import { Sequelize, DataTypes } from 'sequelize';
import { env } from './env.js';
import { Author } from '../authors/author.model.js';
import { Category } from '../categories/category.model.js';
import { Commun } from '../communs/commun.model.js';
import { Editorial } from '../editorials/editorial.model.js';
import { Loan_status } from '../loans-status/loan-status.model.js';
import { Loan } from '../loans/loan.model.js';
import { Province } from '../province/province.model.js';
import { Region } from '../region/region.model.js';
import { Return_status } from '../return-status/return-status.model.js';
import { User_status } from '../user-status/user-status.model.js';
import { User_type } from '../user-type/user-type.model.js';
import { User } from '../users/user.model.js';
import { News } from '../news/news.model.js';
import { News_gallery } from '../news-gallery/news-gallery.model.js';
import { Book } from '../books/book.model.js';

let sequelize;

sequelize = new Sequelize(
    env.database.name,
    env.database.user,
    env.database.password,
    {
        host : env.database.host,
        port : env.database.port,
        dialect : env.database.dialect,
        logging: false,
        dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

let initialized = false;
let models = {};

export const getModels = () => {
    if(!initialized) {
        models = {
            AuthorModel : Author(sequelize, DataTypes),
            CategoryModel : Category(sequelize, DataTypes),
            CommunModel : Commun(sequelize, DataTypes),
            EditorialModel : Editorial(sequelize, DataTypes),
            Loan_statusModel : Loan_status(sequelize, DataTypes),
            LoanModel : Loan(sequelize, DataTypes),
            ProvinceModel : Province(sequelize, DataTypes),
            RegionModel : Region(sequelize, DataTypes),
            Return_statusModel : Return_status(sequelize, DataTypes),
            Loan_statusModel : Loan_status(sequelize, DataTypes),
            User_statusModel : User_status(sequelize, DataTypes),
            User_typeModel : User_type(sequelize, DataTypes),
            UserModel : User(sequelize, DataTypes),
            NewsModel : News(sequelize, DataTypes),
            News_galleryModel : News_gallery(sequelize, DataTypes),
            BookModel : Book(sequelize, DataTypes)
        };
        initialized = true;
    }
    return models;
};

const { AuthorModel, CategoryModel, CommunModel, EditorialModel, Loan_statusModel, LoanModel, ProvinceModel, RegionModel, Return_statusModel, User_statusModel, User_typeModel, UserModel, NewsModel, News_galleryModel, BookModel  } = getModels();

export { sequelize, AuthorModel, CategoryModel, CommunModel, EditorialModel, Loan_statusModel, LoanModel, ProvinceModel, RegionModel, Return_statusModel, User_statusModel, User_typeModel, UserModel, NewsModel, News_galleryModel, BookModel };