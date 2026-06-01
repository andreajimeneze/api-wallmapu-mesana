import { sequelize } from "../../config/dbSequelize.js";
import {
  bulkCreateEditionFormatRepository,
  deleteEditionFormatByIdEditionRepository,
} from "./edition_format.respository.js";

export const createEditionFormatService = async (
  idEdition,
  formats = [],
  options = {},
) => {
  if (format_ids.length === 0) {
    await deleteEditionFormatByIdEditionRepository(idEdition, { transaction });
  }

  const editionFormats = formats.map((idFormat) => ({
    idEdition,
    idFormat,
  }));

  return await bulkCreateEditionFormatRepository(editionFormats, options);
};

export const updateEditionFormatService = async (
  idEdition,
  format_ids = [],
  options = {},
) => {
  const transaction = options.transaction;
  try {
    await deleteEditionFormatByIdEditionRepository(idEdition, { transaction });

  
      const editionFormat = format_ids.map((idFormat) => ({
        idEdition,
        idFormat,
      }));
    

    await bulkCreateEditionFormatRepository(editionFormat, { transaction });
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteEditionFormatService = async (idEdition, options = []) => {
  return await deleteEditionFormatByIdEditionRepository(idEdition, options);
};
