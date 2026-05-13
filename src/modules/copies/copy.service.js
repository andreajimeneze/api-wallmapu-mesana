import { ForeignKeyConstraintError, Op } from "sequelize";
import { getEditionByIdService } from "../editions/edition.service.js";
import { createCopyRepository, deleteCopyRepository, existingCopyRespository, existingSignatureRepository, findAllCopiesByBookRepository, findCopiesByBookAndStatusRepository, findCopiesByEditionIdRepository, findCopyByIdRepository, updateCopyRepository } from "./copy.repository.js";

export const getAllCopiesService = async () => {
  return await findAllCopiesByBookRepository();
};

export const getAllCopiesByBookService = async (bookId) => {
  return await findAllCopiesByBookRepository(bookId);
};

export const getCopiesByEditionIdService = async (editionId) => {
  return await findCopiesByEditionIdRepository(editionId);
};

export const getAllCopiesAvailableService = async (bookId, statusId) => {
  const activeCopies = await findCopiesByBookAndStatusRepository(bookId, 1);

  const data = activeCopies.map(copy => {
    const loans = copy.loan || [];

    const reservations = copy.reservations || [];

    const hasActiveLoan = loans.some(loan =>
      loan.loanStatus &&
      !['Devuelto', 'Vencido'].includes(loan.loanStatus.name)
    );

    const hasActiveReservation = reservations.some(reserve =>
      reserve.reservationStatus &&
      reserve.reservationStatus.name === 'Pendiente de retiro'
    );

    let availability_status = 'disponible';

    if (hasActiveLoan) {
      availability_status = 'en préstamo';
    } else if (hasActiveReservation) {
      availability_status = 'reservado';
    }

    return copyByBookResponseDTO({
      ...copy.get({ plain: true }),
      availability_status
    });
  });

  return data;
};

export const getCopyByIdService = async (id) => {
  return await findCopyByIdRepository(id);
};

export const createCopyService = async (copyData) => {
    const idEdition = copyData.editionId;

    const [existingCopy, existingSignature] = await Promise.all([
      existingCopyRespository(copyData.editionId),
      existingSignatureRepository(copyData.editionId, copyData.signatureTopography)
    ]);

      await getEditionByIdService(idEdition);

    if (existingCopy) {
      throw new Error('Número de copia ya existe');
    };

    if (existingSignature) {
      throw new Error('Signatura ya existe para ese libro');
    };

    const createdCopy = await createCopyRepository(copyData);

    return await getCopyByIdService(createdCopy.idCopy);
  };
export const updateCopyService = async (id, copyData) => {
  const searchedCopy = await findCopyByIdRepository(id);

  if (!searchedCopy) {
    throw new Error("Copia no encontrada");
  }

  return await updateCopyRepository(id, copyData);
};

export const deleteCopyService = async (id) => {
  const selectedCopy = await findCopyByIdRepository(id);

  if (!selectedCopy) {
    throw new Error("Copia no encontrada");
  }
    return await deleteCopyRepository(id);
};
