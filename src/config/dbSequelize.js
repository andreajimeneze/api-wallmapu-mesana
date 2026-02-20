import { Sequelize, DataTypes } from "sequelize";
import pg from "pg";
import { env } from "./env.js";

import { Author } from "../modules/authors/author.model.js";
import { Book } from "../modules/books/book.model.js";
import { Category } from "../modules/categories/category.model.js";
import { Commune } from "../modules/commune/commune.model.js";
import { Editorial } from "../modules/editorials/editorial.model.js";
import { Loan_status } from "../modules/loans-status/loan-status.model.js";
import { Loan } from "../modules/loans/loan.model.js";
import { Province } from "../modules/province/province.model.js";
import { Region } from "../modules/region/region.model.js";
import { Return_status } from "../modules/return-status/return-status.model.js";
import { UserStatus } from "../modules/user-status/user-status.model.js";
import { UserRole } from "../modules/user-role/user-role.model.js";
import { User } from "../modules/users/user.model.js";
import { News } from "../modules/news/news.model.js";
import { NewsGallery } from "../modules/news-gallery/news-gallery.model.js";

let sequelize = new Sequelize(
  env.database.name,
  env.database.user,
  env.database.password,
  {
    host: env.database.host,
    port: env.database.port,
    dialect: "postgres",
    dialectModule: pg,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

let initialized = false;
let models = {};

export const getModels = () => {
  if (!initialized) {
    // Inicializa los modelos
    models = {
      AuthorModel: Author(sequelize, DataTypes),
      BookModel: Book(sequelize, DataTypes),
      CategoryModel: Category(sequelize, DataTypes),
      CommuneModel: Commune(sequelize, DataTypes),
      EditorialModel: Editorial(sequelize, DataTypes),
      Loan_statusModel: Loan_status(sequelize, DataTypes),
      LoanModel: Loan(sequelize, DataTypes),
      ProvinceModel: Province(sequelize, DataTypes),
      RegionModel: Region(sequelize, DataTypes),
      Return_statusModel: Return_status(sequelize, DataTypes),
      UserStatusModel: UserStatus(sequelize, DataTypes),
      UserRoleModel: UserRole(sequelize, DataTypes),
      UserModel: User(sequelize, DataTypes),
      NewsModel: News(sequelize, DataTypes),
      NewsGalleryModel: NewsGallery(sequelize, DataTypes),
    };

    // Asociaciones
    Object.values(models).forEach((model) => {
      if (model.associate) {
        model.associate(models); // aquí usamos los modelos "Model" (AuthorModel, BookModel...)
      }
    });

    initialized = true;
  }
  return models;
};

// Exporta los modelos listos para usar
export const {
  AuthorModel,
  BookModel,
  CategoryModel,
  CommuneModel,
  EditorialModel,
  Loan_statusModel,
  LoanModel,
  ProvinceModel,
  RegionModel,
  Return_statusModel,
  UserStatusModel,
  UserRoleModel,
  UserModel,
  NewsModel,
  NewsGalleryModel,
} = getModels();

export { sequelize };
