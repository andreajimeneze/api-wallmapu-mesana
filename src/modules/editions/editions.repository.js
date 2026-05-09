import { EditionModel } from "../../config/dbSequelize.js";

export const findAllEditionsRepository = async () => {
  return await EditionModel.findAll({
    include: [
      {
        model: BookModel,
        as: "book",
      },
      {
        model: EditorialModel,
        as: "editorial",
        attributes: ['idEditorial', 'name']
      },
      {
        model: CopyModel,
        as: 'copies',
        required: true,
        attributes: ['idCopy', 'barcode', 'copyNumber', 'signatureTopography', 'createdAt']
      }
    ],
  });
};

export const findEditionByIdRepository = async (id) => {
  return await EditionModel.findOne({
    where: {
      idEdition: id
    },
    include: [
      {
        model: BookModel,
        as: "book",
        attributes: ['idBook', 'title']
      },
      {
        model: EditorialModel,
        as: "editorial",
        attribute: ['name']
      }
    ],
  }
  );
};

// export const getEditionByBookIdService = async (idBook) => {
//   const edition = await EditionModel.findOne({
//     where: { bookId: idBook },
//   });

//   if(!edition) {
//     const error = new Error("No existe edición para el libro");
//     error.status = 404;
//     throw error;
//   }

//   return editionResponseDTO(edition);
// };

export const createEditionRepository = async (editionData) => {

  const editionCreated = await EditionModel.create(editionData);

  return await EditionModel.findByPk(
    editionCreated.idEdition,
    {
      include: [
        {
          model: BookModel,
          as: "book",
        },
        {
          model: EditorialModel,
          as: "editorial",
        },
      ],
    }
  );
};

export const updateEditionRepository = async (id, editionData) => {
    await EditionModel.update(editionData, {
        where: {
            idEdition: id
        }
    });
    return EditionModel.findByPk(id);
};

export const deleteEditionRepository = async (id) => {
  await EditionModel.destroy({
    where: {
        idEdition: id
    }
  })
  return true;
};
