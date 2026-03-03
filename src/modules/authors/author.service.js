import { AuthorModel } from "../../config/dbSequelize.js";

export const getAllAuthorsService = async () => {
    return await AuthorModel.findAll();
}