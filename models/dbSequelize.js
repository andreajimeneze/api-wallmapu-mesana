import { Sequelize, DataTypes } from 'sequelize';
import { Author } from './author.js';
import { Category } from './category.js';
import { Commun } from './commun.js';
import { Editorial } from './editorial.js';
import { Loan_status } from './loan_status.js';
import { Loan } from './loan.js';
import { Province } from './province.js';
import { Region } from './region.js';
import { Return_status } from './return_status.js';
import { User_status } from './user_status.js';
import { User_type } from './user_type.js';
import { User } from './user.js';
import { News } from './news.js';
import { News_gallery } from './news_gallery.js';
import { Book } from './book.js';

let sequelize;

const DB_USER = 'neondb_owner';
const DB_PASS = 'npg_Npj9gA2bLcPX';
const DB_NAME = 'neondb';
const DB_HOST = 'ep-sweet-cloud-adeqpfbo-pooler.c-2.us-east-1.aws.neon.tech';
const DB_ENGINE = 'postgres';
const DB_PORT = 5432;

sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host : DB_HOST,
    port : DB_PORT,
    dialect : DB_ENGINE,
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