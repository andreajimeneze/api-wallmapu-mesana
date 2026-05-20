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
export const findCopyByIdRepository = async (id, options = {}) => {
    return await CopyModel.findByPk(id, {
        include: [
            {
                model: CopyStatusModel,
                as: 'status'
            }
        ]
    }, options);
};
export const createCopyRepository = async (copyData) => {
    return await CopyModel.create(copyData);
};
export const updateCopyRepository = async (id, data, options = {}) => {
    const [count, updatedCopy] = await CopyModel.update(data, {
        where: {
            idCopy: id
        }, ...options, returning: true
    });

    return updatedCopy;
};

export const updateStatusCopyRepository = async (idCopy, currentStatusId, statusId, options = {}) => {
    return await CopyModel.update(
        { 
            statusId:  statusId
        },
        {
            where: {
                idCopy: idCopy,
                statusId: currentStatusId
            }, ...options
        }
    )
    
}
export const deleteCopyRepository = async (id, options = {}) => {
    return await CopyModel.destroy({
        where: {
            idCopy: id
        }, ...options
    });
};
export const existingCopyRespository = async (copyNumber, editionId, excludeId) => {
    return CopyModel.findOne({
        where: {
            copyNumber: copyNumber,
            editionId: editionId,
            idCopy: {
                [Op.ne]: excludeId
            }
        }
    })
};
export const existingSignatureRepository = async (signature, excludeId = null) => {
    return await CopyModel.findOne({
        where: {
            signatureTopography: signature,
            idCopy: {
                [Op.ne]: excludeId
            }
        }
    });
};
export const existingCopiesByEditionRepository = async (editionId) => {
    return await CopyModel.count({ where: { editionId } });
};