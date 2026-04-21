import { Op } from "sequelize";
import {
  BookModel,
  CopyModel,
  CopyStatusModel,
  EditionModel,
  EditorialModel,
  GenreModel,
  LoanModel,
  LoanStatusModel,
  ReservationModel,
  ReservationStatusModel
} from "../../config/dbSequelize.js";
import { getEditionByIdService } from "../editions/edition.service.js";



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

export const getCopiesByEditionIdService = async (editionId) => {
  
  const copy = await CopyModel.findAll(
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

  return copy;
};

export const getAllCopiesAvailableService = async (bookId) => {
  const activeCopies = await CopyModel.findAll({
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
            // where: {
            //   name: {
            //     [Op.notIn]: ['Devuelto', 'Vencido']
            //   }

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
            // where: {
            //   name: {
            //     [Op.ne]: 'Pendiente de retiro'
            //   }
            // }
          }
        ]
      }
    ],
  });

  const data = activeCopies.filter(copy => {
    const hasActiveLoan = copy.loan && copy.loan.loanStatus && !['devuelto', 'vencido'];
    const hasActiveReservation = copy.reservations && copy.reservations.some(reserve => 
      reserve.reservationStatus && reserve.reservationStatus.name == 'Pendiente de retiro'
    );

    return !hasActiveLoan && !hasActiveReservation;
  })
  .map(copy => ({
    ...copy.toJSON(),
    availability_status: 'disponible'
  }))

  return data
};

export const getCopyByIdService = async (id) => {
  return await CopyModel.findByPk(id);
};

export const createCopyService = async (copyData) => {

  try {
    const idEdition = copyData.editionId;

    const edition = await getEditionByIdService(idEdition);

    if (!edition) {
      throw new Error("Edición no encontrada");
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
        editionId: copyData.editionId,
        signatureTopography: copyData.signatureTopography
      },
      include: [
        {
          model: EditionModel,
          as: 'edition',
          required: true,
          where: {
            idEdition: copyData.editionId
          },
          include: [
            {
              model: BookModel,
              as: 'book'
            }
          ]
        }
      ]
    })

    if (existingSignature) {
      throw new Error('Signatura ya existe para ese libro');
    };

    return await CopyModel.create(copyData);

  } catch (error) {
    console.error('copy service: ' , error);
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
    throw new Error("Copia no encontrada");
  }

  return await searchedCopy.update(copyData);
};

export const deleteCopyService = async (id) => {
  const selectedCopy = await CopyModel.findByPk(id);

  if (!selectedCopy) {
    const error = new Error("Copia no encontrada");
    error.status = 404;
    throw error;
  }

  await selectedCopy.destroy();
  return true;
};
