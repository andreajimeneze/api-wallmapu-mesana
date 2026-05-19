import { conflictError, notFoundError } from "../../core/helpers/errors/httpErrors.js";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";
import { baseGenreDTO } from "./genre.dto.js";
import { createGenreRepository, deleteGenreRepository, findAllGenresRepository, findGenreByIdRepository, findGenreByNameRepository, getAllGenresPaginationRepository, updateGenreRepository } from "./genre.repository.js";

export const getAllGenresPaginationService = async (params) => {
  return await getAllPaginationService(params, getAllGenresPaginationRepository, baseGenreDTO);
};
export const getAllGenresService = async () => {
    return await findAllGenresRepository();
};

export const getGenreByIdService = async (id) => {
    const genre = await findGenreByIdRepository(id);
    if(!genre) throw notFoundError();
    return genre;
};

export const createGenreService = async(name, options = {}) => {
    
    const normalizeName = name.trim();
    const genre = await findGenreByNameRepository(normalizeName);
    if(genre) throw conflictError('Género ya se encuentra registrado');

    return await createGenreRepository({name: normalizeName}, options);
};

export const updateGenreService = async(id, genreData, options = {}) => {
    const { idGenre, name} = genreData;
    const currentId = Number(id);
    const genre = await findGenreByIdRepository(currentId);

    if(!genre) throw notFoundError();
    const duplicate = await findGenreByNameRepository(name);
    if(duplicate && duplicate.idGenre === currentId) throw conflictError('Género ya existe no puede usar el mismo nombre')

    return await updateGenreRepository(currentId, {name}, options);
};


export const deleteGenreService = async(idGenre) => {
    const genre = await findGenreByIdRepository(idGenre);

    if(!genre) throw notFoundError();

    await deleteGenreRepository(idGenre);
    return true;
};