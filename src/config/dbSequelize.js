import { Sequelize, DataTypes } from "sequelize";
import pg from "pg";
import { env } from "./env.js";

import { Author } from "../modules/authors/author.model.js";
import { Book } from "../modules/books/book.model.js";
import { Commune } from "../modules/commune/commune.model.js";
import { Editorial } from "../modules/editorials/editorial.model.js";
import { LoanStatus } from "../modules/loans-status/loan-status.model.js";
import { Loan } from "../modules/loans/loan.model.js";
import { Province } from "../modules/province/province.model.js";
import { Region } from "../modules/region/region.model.js";
import { UserStatus } from "../modules/user-status/user-status.model.js";
import { UserRole } from "../modules/user-role/user-role.model.js";
import { User } from "../modules/users/user.model.js";
import { News } from "../modules/news/news.model.js";
import { NewsGallery } from "../modules/news-gallery/news-gallery.model.js";
import { Subject } from "../modules/subjects/subject.model.js";
import { Copy } from '../modules/copies/copy.model.js';
import { CopyStatus } from '../modules/copy_status/copy-status.model.js';
import { Genre } from '../modules/genres/genre.model.js';
import { Edition } from '../modules/editions/edition.model.js';
import { BookAuthor } from "../modules/book_authors/book_author.model.js";
import { BookSubject } from '../modules/book_subjects/book_subject.model.js';
import { Reservation } from "../modules/reservation/reservation.model.js";
import { ReservationStatus } from "../modules/reservation_status/reservation_status.model.js";
import { Notification } from "../modules/notification/notification.model.js";
import { LoanPolicy } from "../modules/loan_policy/loan_policy.model.js";
import { Format } from "../modules/format/format.model.js";
import { EditionFormat } from "../modules/edition_format/edition_format.model.js";


// Para conexión en vercel
// let sequelize = new Sequelize(
//   env.database.name,
//   env.database.user,
//   env.database.password,
//   {
//     host: env.database.host,
//     port: env.database.port,
//     dialect: "postgres",
//     dialectModule: pg,
//     logging: false,
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   }
// );

//Para base de datos local postgres
let sequelize = new Sequelize(
  env.database.name,
  env.database.user,
  env.database.password,
  {
    host: env.database.host,
    port: env.database.port,
    dialect: "postgres",
    dialectModule: pg,
    logging: false
  }
);

let initialized = false;
let models = {};

export const getModels = () => {
  if (!initialized) {
    
    models = {
      AuthorModel: Author(sequelize, DataTypes),
      BookModel: Book(sequelize, DataTypes),
      CommuneModel: Commune(sequelize, DataTypes),
      EditorialModel: Editorial(sequelize, DataTypes),
      LoanStatusModel: LoanStatus(sequelize, DataTypes),
      LoanModel: Loan(sequelize, DataTypes),
      ProvinceModel: Province(sequelize, DataTypes),
      RegionModel: Region(sequelize, DataTypes),
      UserStatusModel: UserStatus(sequelize, DataTypes),
      UserRoleModel: UserRole(sequelize, DataTypes),
      UserModel: User(sequelize, DataTypes),
      NewsModel: News(sequelize, DataTypes),
      NewsGalleryModel: NewsGallery(sequelize, DataTypes),
      SubjectModel: Subject(sequelize, DataTypes),
      CopyModel: Copy(sequelize, DataTypes),
      CopyStatusModel: CopyStatus(sequelize, DataTypes),
      GenreModel: Genre(sequelize, DataTypes),
      EditionModel: Edition(sequelize, DataTypes),
      BookAuthorModel: BookAuthor(sequelize, DataTypes),
      BookSubjectModel: BookSubject(sequelize, DataTypes),
      ReservationModel: Reservation(sequelize, DataTypes),
      ReservationStatusModel: ReservationStatus(sequelize, DataTypes),
      NotificationModel: Notification(sequelize, DataTypes),
      LoanPolicyModel: LoanPolicy(sequelize, DataTypes),
      FormatModel: Format(sequelize, DataTypes),
      EditionFormatModel: EditionFormat(sequelize, DataTypes)
    };

    // Asociaciones
    Object.values(models).forEach((model) => {
      if (model.associate) {
        model.associate(models); 
      }
    });

    initialized = true;
  }
  return models;
};

export const {
  AuthorModel,
  BookModel,
  CommuneModel,
  EditorialModel,
  LoanStatusModel,
  LoanModel,
  ProvinceModel,
  RegionModel,
  UserStatusModel,
  UserRoleModel,
  UserModel,
  NewsModel,
  NewsGalleryModel,
  SubjectModel,
  CopyModel,
  CopyStatusModel,
  GenreModel,
  EditionModel,
  BookAuthorModel,
  BookSubjectModel,
  ReservationModel,
  ReservationStatusModel,
  NotificationModel,
  LoanPolicyModel,
  FormatModel,
  EditionFormatModel
} = getModels();

export { sequelize };
