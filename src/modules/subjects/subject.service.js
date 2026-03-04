import { SubjectModel } from "../../config/dbSequelize.js";

export const getAllSubjectsService = async () => {
    return await SubjectModel.findAll();
}

export const getSubjectByIdService = async (id) => {
    return await SubjectModel.findByPk(id);
}