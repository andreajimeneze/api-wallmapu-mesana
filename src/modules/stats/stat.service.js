import {
  AuthorModel,
  BookModel,
  CommuneModel,
  EditorialModel,
  LoanModel,
  NewsModel,
  ProvinceModel,
  RegionModel,
  ReservationModel,
  SubjectModel,
  UserModel,
} from "../../config/dbSequelize.js";

export const getAllStatesAdminService = async () => {
  const [
    users,
    news,
    books, 
    loans,
    reservations
  ] = await Promise.all([
    UserModel.count(),
    NewsModel.count(),
    BookModel.count(),
    LoanModel.count(),
    ReservationModel.count()
  ]);

  return {
    users,
    news,
    books,
    loans,
    reservations
  };
};

export const getAllAdminService = async () => {
  const [
    users,
    news,
    authors,
    editorials,
    books, 
    communes,
    provinces,
    regions,
    subjects
  
  ] = await Promise.all([
    UserModel.count(),
    NewsModel.count(),
    AuthorModel.count(),
    EditorialModel.count(),
    BookModel.count(),
    CommuneModel.count(),
    ProvinceModel.count(),
    RegionModel.count(),
    SubjectModel.count()
  ]);

  return {
    users,
    news,
    authors,
    editorials,
    books,
    communes,
    provinces,
    regions,
    subjects
  };
};
