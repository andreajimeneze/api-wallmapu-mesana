import {
  AuthorModel,
  BookModel,
  EditorialModel,
  LoanModel,
  NewsModel,
  ReservationModel,
  UserModel,
} from "../../config/dbSequelize.js";

export const getAllStatesAdminService = async () => {
  const [
    users,
    news,
    authors,
    editorials,
    books, 
    loans,
    reservations
  ] = await Promise.all([
    UserModel.count(),
    NewsModel.count(),
    AuthorModel.count(),
    EditorialModel.count(),
    BookModel.count(),
    LoanModel.count(),
    ReservationModel.count()
  ]);

  return {
    users,
    news,
    authors,
    editorials,
    books,
    loans,
    reservations
  };
};
