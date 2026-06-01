import { conflictError, notFoundError } from "../../core/helpers/errors/httpErrors.js";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";
import { findOneEditionFormatByFormatIdRepository } from "../edition_format/edition_format.respository.js";
import { formatResponseDTO } from "./format.dto.js";
import { findAllFormatsRepository, findFormatByNameRepository, findFormatByIdRepository, getAllFormatPaginationRepository, updateFormatRepository, createFormatRepository, deleteFormatRepository } from "./format.repository.js";

export const getAllFormatsPaginationService = async (params) => {
  return await getAllPaginationService(params, getAllFormatPaginationRepository, formatResponseDTO);
};
export const getAllFormatssService = async () => {
  return await findAllFormatsRepository();
};

export const getFormatByIdService = async (id) => {
  const searched = await findFormatByIdRepository(id);
  if(!searched) throw notFoundError();
  return searched;
};

export const createFormatService = async (name, options = {}) => {
  const normalizeName = name.trim();
  const format = await findFormatByNameRepository(normalizeName);
  if(format) throw conflictError('Formato ya se encuentra registrado');
 
  return await createFormatRepository({name: normalizeName}, options);
};

export const updateFormatService = async (id, formatData, options = {}) => {
  const {idFormat, name} = formatData;
  const currentId = Number(id);
  const format = await findFormatByIdRepository(currentId);
  if(!format) throw notFoundError();
  const duplicate = await findFormatByNameRepository(name);
  if(duplicate && duplicate.idFormat === currentId) throw conflictError('Formato ya existe no puede usar el mismo nombre');

  return await updateFormatRepository(currentId, name, options);
};

export const deleteFormatService = async (id, options = {}) => {
  const selectedFormat = await findFormatByIdRepository(id);
  if (!selectedFormat) throw notFoundError();

  const editionFormat = await findOneEditionFormatByFormatIdRepository(id);
  if (editionFormat) throw conflictError('No puede eliminar un formato asignado a una edición existente');

  await deleteFormatRepository(id, options);
  return true;
};

