import { Op } from "sequelize";
import { CopyModel, CopyStatusModel, EditionModel, BookModel, EditorialModel, LoanModel, LoanStatusModel, ReservationModel, ReservationStatusModel } from "../../config/dbSequelize.js";

export const findCopiesByEditionIdRepository = async (editionId) => {
    return await CopyModel.findAll(
        {
            where: { editionId: editionId },
            include: [
                {
                    model: EditionModel,
                    as: "edition",
                    required: true,
                    include: [
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
        });
};
export const findCopiesByBookAndStatusRepository = async (bookId, statusIds) => {
    return await CopyModel.findAll({
        where: {
            statusId: { [Op.in]: statusIds }
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
export const findCopyByIdRepository = async (id) => {
    return await CopyModel.findByPk(id, {
        include: [
            {
                model: CopyStatusModel,
                as: 'status'
            }
        ]
    });
};
export const createCopyRepository = async (copyData) => {
    return await CopyModel.create(copyData);
};
export const updateCopyRepository = async (id, data, options = {}) => {
    const [count, [updatedCopy]] = await CopyModel.update(data, {
        where: {
            idCopy: id
        }, ...options, returning: true
    });
    if (count === 0) return null;
    return updatedCopy;
};
export const deleteCopyRepository = async (id, options = {}) => {
    return await CopyModel.destroy({
        where: {
            idCopy: id
        }, ...options
    });
};
export const existingCopyRespository = async (copyNumber, editionId, bookId, excludeId) => {
    const where = {
        copyNumber: copyNumber,
    };

    if (excludeId != null) {
        where.idCopy = { [Op.ne]: excludeId };
    }

    return await CopyModel.findOne({
        where,
        include: [{
            model: EditionModel,
            as: 'edition',
            where: {
                bookId
            },
            attributes: []
        }]
    });
};
export const existingSignatureRepository = async (signature, excludeId = null) => {
    const where = {
        signatureTopography: signature,
    };

    if (excludeId != null) {
        where.idCopy = { [Op.ne]: excludeId };
    }

    return await CopyModel.findOne({ where });
};
export const existingCopiesByEditionRepository = async (editionId) => {
    return await CopyModel.count({ where: { editionId } });
};