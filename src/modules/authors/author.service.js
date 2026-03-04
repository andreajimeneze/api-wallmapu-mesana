import { AuthorModel } from "../../config/dbSequelize.js";
import { createAuthorDTO } from "./author.dto.js";

export const getAllAuthorsService = async () => {
    return await AuthorModel.findAll();
};

export const getAuthorByIdService = async (id) => {
    return await AuthorModel.findByPk(id);
};

export const createAuthorService = async ({ name }) => {

    const existingAuthor = await AuthorModel.findOne({
        where: { name: { [Op.iLike]: name.trim() } }
    })

    if(existingAuthor) {
        throw new Error('Autor ya existe');
    }

    const dto = createAuthorDTO({
        name
    });

    return AuthorModel.create(dto);
};