import {
  AuthorModel,
  CommuneModel,
  EditorialModel,
  NewsModel,
  ProvinceModel,
  RegionModel,
  SubjectModel,
  UserModel,
} from "../../config/dbSequelize.js";

export const getAllStatesAdminService = async () => {
  const [
    users,
    news,
    regions,
    provinces,
    communes,
    authors,
    editorials,
    subjects,
  ] = await Promise.all([
    UserModel.count(),
    NewsModel.count(),
    RegionModel.count(),
    ProvinceModel.count(),
    CommuneModel.count(),
    AuthorModel.count(),
    EditorialModel.count(),
    SubjectModel.count(),
  ]);

  return {
    users,
    news,
    regions,
    provinces,
    communes,
    authors,
    editorials,
    subjects,
  };
};
