import {
  BookModel,
  CopyModel,
  CopyStatusModel,
  EditionModel,
  EditorialModel,
  GenreModel
} from "../../config/dbSequelize.js";

import { baseCopyDTO } from "./copy.dto.js";


export const getAllCopiesService = async () => {
  return await CopyModel.findAll({
    order: [["idCopy", "ASC"]],
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

export const getCopiesByEditionIdService = async (idEdition) => {
  const copy = await CopyModel.findAll(
    {
      where: { editionId: idEdition },
      include: [
        {
          model: CopyStatusModel,
          attributes: ['name'],
          as: "status"
        },
      ],
    });

  return copy;
};

export const getAllCopiesAvailableService = async (bookId) => {
  return await CopyModel.findAll({
    where: {
      statusId: 1
    },
    include: [
      {
        model: EditionModel,
        as: "edition",
        required: true,
        include: [
          {
            model: BookModel,
            as: "book",
            required: true,
            where: {
              idBook: bookId
            }
          },
          {
            model: EditorialModel,
            as: "editorial"
          }
        ],
      },
      {
        model: CopyStatusModel, 
        as: "status"
      },
    ],
  })
};

export const getCopyByIdService = async (id) => {
  return await CopyModel.findByPk(id);
};

export const createCopyService = async (copyData) => {

  try {

    const edition = await EditionModel.findByPk(copyData.editionId);

    if (!edition) {
      throw new Error("Edición no existe");
    }

    const existingCopy = await CopyModel.findOne({
      where: {
        editionId: copyData.editionId,
        copyNumber: copyData.copyNumber
      }
    })

    if (existingCopy) {
      throw new Error('Número de copia ya existe');
    };

    const existingSignature = await CopyModel.findOne({
      where: {
        signatureTopography: copyData.signatureTopography
      },
      include: [
        {
          model: EditionModel,
          as: 'edition',
          required: true,
          where: {
            bookId: edition.bookId
          }
        }
      ]
    })

    if (existingSignature) {
      throw new Error('Signatura ya existe para ese libro');
    };

    return await CopyModel.create(copyData);

  } catch (error) {
    console.error(error);
    throw error;
  }



};

export const updateCopyService = async (id, copyData) => {
  const searchedCopy = await CopyModel.findByPk(id, {
    include: [
      {
        model: CopyStatusModel,
        as: 'status'
      }
    ]
  });


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
