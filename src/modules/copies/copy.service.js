import {
  BookModel,
  CopyModel,
  CopyStatusModel,
  EditionModel,
  EditorialModel,
  GenreModel,
} from "../../config/dbSequelize.js";

export const getAllCopiesService = async () => {
  return await CopyModel.findAll({
    include: [
      {
        model: EditionModel,
        as: "edition",
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

export const getCopyByIdService = async (id) => {
  return await CopyModel.findByPk(id, {
    include: [
      {
        model: EditionModel,
        as: "edition",
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
