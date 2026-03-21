import {
  BookModel,
  CopyModel,
  CopyStatusModel,
  EditionModel,
  EditorialModel,
  GenreModel,
} from "../../config/dbSequelize.js";
import { createCopyDTO } from "./copy.dto.js";

export const getAllCopiesService = async () => {
  return await CopyModel.findAll({
    include: [
      {
        model: EditionModel,
        as: "editions",
        include: [
          {
            model: BookModel,
            as: "books",
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

export const getCopyByIdService = async (id) => {
  return await CopyModel.findByPk(id, {
    include: [
      {
        model: EditionModel,
        as: "editions",
        include: [
          {
            model: BookModel,
            as: "books",
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

export const createCopyService = async (dto) => {
  const copyDto = createCopyDTO(dto);

  return await CopyModel.create(copyDto);
} 