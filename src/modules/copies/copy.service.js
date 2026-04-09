import {
  BookModel,
  CopyModel,
  CopyStatusModel,
  EditionModel,
  EditorialModel,
  GenreModel
} from "../../config/dbSequelize.js";
import { createCopyDTO, copyJoinResponseDTO } from "./copy.dto.js";

export const getAllCopiesService = async () => {
  return await CopyModel.findAll({
    order: [["idCopy", "ASC"]],
    include: [
      {
        model: EditionModel,
        as: "editions",
        include: [
          {
            model: BookModel,
            as: "book",
            include: [
              {
                model: GenreModel,
                as: "genre",
              },
            ],
          },
          { model: EditorialModel, as: "editorial" },
        ],
      },
      { model: CopyStatusModel, as: "status" },
    ],
  });
};

export const getAllCopiesByBookService = async (bookId) => {
  return await CopyModel.findAll({

    order: [["idCopy", "ASC"]],
    include: [
      {
        model: EditionModel,
        as: "edition",
        where: {
          bookId: bookId
        },
        include: [
          {
            model: EditorialModel,
            as: "editorial"
          },
          {
            model: BookModel,
            as: "book",
          }
        ],
      },
      { 
        model: CopyStatusModel, 
        as: "status" 
      }
    ],
  });
};

export const getCopyByEditionIdService = async (idEdition) => {
  const copy = await CopyModel.findByPk(
    idEdition, {
    where: { editionId: idEdition },
    include: [
      {
        model: EditionModel,
        as: "editions",
        attributes: ["idEdition", "edition", "bookId", "editorialId"],
        include: [
          {
            model: BookModel,
            as: "book",
            include: [
              {
                model: GenreModel,
                as: "genre",
              },
            ],
          },
          { model: EditorialModel, as: "editorial" },
        ],
      },
      { model: CopyStatusModel, as: "status" },
    ],
  });
  console.log("copy by id en service para admin: ", copyJoinResponseDTO(copy));
  return copy;
};

export const createCopyService = async (copyData) => {

  const copyDto = createCopyDTO(copyData);

  return await CopyModel.create(copyDto);
};

export const updateCopyService = async (id, copyData) => {
  const searchedCopy = await CopyModel.findByPk(id);

  if (!searchedCopy || searchedCopy === 0) {
    throw new Error("No existe copia");
  }

  return await searchedCopy.update(copyData);
};

export const deleteCopyService = async (id) => {
  const selectedCopy = await CopyModel.findByPk(id);

  if (!selectedCopy) {
    const error = new Error("Copia no existe");
    error.status = 404;
    throw error;
  }

  await selectedCopy.destroy();
  return true;
};
