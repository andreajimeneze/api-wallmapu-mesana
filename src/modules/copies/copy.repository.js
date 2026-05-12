import { Op } from "sequelize";
import { CopyModel, CopyStatusModel } from "../../config/dbSequelize.js";

export const findAllCopiesRepository = async () => {
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
export const findAllCopiesByBookRepository = async (bookId) => {
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
export const findCopiesByEditionIdRepository = async (editionId) => {

    return await CopyModel.findAll(
        {
            where: { editionId: editionId },
            include: [
                {
                    model: CopyStatusModel,
                    attributes: ['name'],
                    as: "status"
                },
            ],
        });
};
export const findCopiesByBookAndStatusRepository = async (bookId, statusId) => {
    return await CopyModel.findAll({
        where: {
            statusId: statusId
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
            {
                model: LoanModel,
                as: 'loan',
                required: false,
                include: [
                    {
                        model: LoanStatusModel,
                        as: 'loanStatus',
                        required: false,
                        attributes: ['idLoanStatus', 'name']
                    }
                ]
            },
            {
                model: ReservationModel,
                as: 'reservations',
                required: false,
                include: [
                    {
                        model: ReservationStatusModel,
                        as: 'reservationStatus',
                        required: false,
                        attributes: ['idStatus', 'name']
                    }
                ]
            }
        ],
    });
};
export const findCopyByIdRepository = async (id, ) => {
    return await CopyModel.findByPk(id, {
        include: [
          {
            model: CopyStatusModel,
            as: 'status'
          }
        ]});
};
export const findCopyByEditionIdRepository = async (editionId) => {
    await CopyModel.findOne({
        where: {
            editionId: editionId,
        }
    });
};
export const createCopyRepository = async (copyData) => {
    const created = await CopyModel.create(copyData);

    return await findCopyByIdRepository(created.idCopy);
};
export const updateCopyRepository = async (id, copyData) => {
    const searched = await CopyModel.findByPk(id);

    return await searched.update(copyData);
};
export const deleteCopyRepository = async (id) => {
    await CopyModel.destroy({
        where: {
            idCopy: id
        }
    });

    return true;
};

export const existingCopyRespository = async (editionId, copyNumber) => {
    return await CopyModel.findOne({
      where: {
        editionId: editionId,
        copyNumber: copyNumber
      }
    });
};
export const existingSignatureRepository = async (signature, excludeId) => {
    return await CopyModel.findOne({
        where: {
            signatureTopography: signature,
            idCopy: { [Op.ne]: excludeId }
        }
    })
};