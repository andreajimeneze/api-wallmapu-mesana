import { findAllGenresRepository } from "./genre.repository.js";

export const getAllGenresService = async () => {
    return await findAllGenresRepository();
};

export const getGenreByIdService = async (id) => {
    return await findGenreByIdRepository(id);
};