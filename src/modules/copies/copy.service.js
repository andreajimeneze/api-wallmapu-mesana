import {
  BookModel,
  CopyModel,
  CopyStatusModel,
  EditionModel,
  EditorialModel,
  GenreModel,
} from "../../config/dbSequelize.js";
import { createCopyDTO, updateCopyDTO } from "./copy.dto.js";

export const getAllCopiesService = async () => {
  return await CopyModel.findAll({
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

export const getCopyByIdService = async (id) => {
  return await CopyModel.findByPk(id);
}

// export const getCopyByIdJoinService = async (id) => {
//   return await CopyModel.findByPk(id, {
//     include: [
//       {
//         model: EditionModel,
//         as: "editions",
//         include: [
//           {
//             model: BookModel,
//             as: "books",
//             include: [
//               {
//                 model: GenreModel,
//                 as: "genre",
//               },
//             ],
//           },
//           { model: EditorialModel, as: "editorial" },
//         ],
//       },
//       { model: CopyStatusModel, as: "status" },
//     ],
//   });
// };

export const createCopyService = async (copyData) => {
  const copyDto = createCopyDTO(copyData);

  return await CopyModel.create(copyDto);
};

export const updateCopyService = async (id, copyData) => {
  const searchedCopy = await CopyModel.findByPk(id);

  if(!searchedCopy || searchedCopy === 0) {
    throw new Error('No existe copia');
  };

  const copyDto = updateCopyDTO(copyData);
  return await searchedCopy.update(copyDto);
};

export const deleteCopyService = async (id) => {
  const selectedCopy = await CopyModel.findByPk(id);

  if(!selectedCopy) {
    const error = new Error('Copia no existe');
    error.status = 404;
    throw error;
  };

  await selectedCopy.destroy();
  return true;
}