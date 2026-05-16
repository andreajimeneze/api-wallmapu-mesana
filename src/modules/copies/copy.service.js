import { getEditionByIdService } from "../editions/edition.service.js";
import { findEditionByIdRepository } from "../editions/editions.repository.js";
import { copyByBookResponseDTO } from "./copy.dto.js";
import { createCopyRepository, deleteCopyRepository, existingCopyRespository, existingSignatureRepository, findAllCopiesByBookRepository, findCopiesByBookAndStatusRepository, findCopiesByEditionAndStatusRepository, findCopiesByEditionIdRepository, findCopyByIdRepository, updateCopyRepository } from "./copy.repository.js";

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

    return {
      ...copy.get({ plain: true }),
      availability_status
    }
  });
  console.log(data)
  return data;
};

export const getAllCopiesByEditionAvailableService = async (editionId, statusId) => {
  const activeCopies = await findCopiesByEditionAndStatusRepository(editionId, 1);

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

    return {
      ...copy.get({ plain: true }),
      availability_status
    }
  });
  return data;
};
export const getCopyByIdService = async (id) => {
  return await findCopyByIdRepository(id);
};

export const createCopyService = async (copyData) => {
  const { editionId, copyNumber, signatureTopography } = copyData;

  // 1. validar input
  if (!editionId || copyNumber == null || !signatureTopography) {
    throw new Error("Datos incompletos");
  }

  const existingCopy = await existingCopyRespository(editionId, copyNumber);
  const existingSignature = await existingSignatureRepository(signatureTopography);

  // 3. comparar resultados
  if (existingCopy) throw new Error("Número de copia ya existe");
  if (existingSignature) throw new Error("Signatura ya existe");

  return await createCopyRepository(copyData);
};
export const updateCopyService = async (id, copyData, options = {}) => {
  const existing = await findCopyByIdRepository(id);
  if(!existing) return null;

  if(existing.copyNumber == copyData.copyNumber) throw new Error("Número de copia ya existe");
  if(existing.signatureTopography == copyData.signatureTopography) throw new Error("Signatura ya existe");
  
  
  await updateCopyRepository(id, copyData);
  return await findCopyByIdRepository(id);
};

export const deleteCopyService = async (id) => {
  const selectedCopy = await findCopyByIdRepository(id);

  if (!selectedCopy) {
    throw new Error("Copia no encontrada");
  }
    return await deleteCopyRepository(id);
};
