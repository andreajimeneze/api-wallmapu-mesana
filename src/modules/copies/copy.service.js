import { conflictError } from "../../core/helpers/errors/httpErrors.js";
import { getEditionByIdService } from "../editions/edition.service.js";
import { findEditionByIdRepository } from "../editions/editions.repository.js";
import { countLoanByCopyRepository, findActiveLoanByCopyIdRepository } from "../loans/loan.repository.js";
import { countReservationByCopyRepository, findActiveReservationByCopyRepository } from "../reservation/reservation.repository.js";
import { copyByBookResponseDTO } from "./copy.dto.js";
import { createCopyRepository, deleteCopyRepository, existingCopyRespository, existingSignatureRepository, findCopiesByBookAndStatusRepository, findCopiesByEditionIdRepository, findCopyByIdRepository, updateCopyRepository } from "./copy.repository.js";

export const getCopiesByEditionIdService = async (editionId) => {
  return await findCopiesByEditionIdRepository(editionId);
};
export const getAllCopiesAvailableByBookService = async (bookId, statusId) => {
  const activeCopies = await findCopiesByBookAndStatusRepository(bookId, [1]);

  const data = activeCopies.map(copy => {
    const loans = copy.loan || [];

    const reservations = copy.reservations || [];

    const hasActiveLoan = loans.some(loan =>
      loan.loanStatus &&
      !['Devuelto'].includes(loan.loanStatus.name)
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
  const copy = await findCopyByIdRepository(id);
  if(!copy) throw notFoundError();
  return copy;
};
export const createCopyService = async (copyData) => {
  const { editionId, copyNumber, signatureTopography, statusId } = copyData;

  if (!editionId || copyNumber == null || !signatureTopography) throw badRequesError('Datos incompletos');
    const edition = await findEditionByIdRepository(editionId);

  const existingCopy = await existingCopyRespository(copyNumber, editionId, edition.copyId);
  const existingSignature = await existingSignatureRepository(signatureTopography, edition.copyId);

  if (existingCopy) throw conflictError('Número de copia ya existe');
  if (existingSignature) throw conflictError("Signatura ya existe");

  return await createCopyRepository(copyData);
};
export const updateCopyService = async (id, copyData, options = {}) => {
   const { idCopy, ...copyFields} = copyData;

  if(id != idCopy) throw conflictError('Copia no coincide con id');
  
  const copy = await findCopyByIdRepository(id);
  if(!copy) throw notFoundError();

  const activeLoan = await findActiveLoanByCopyIdRepository(id);
  if(activeLoan) throw conflictError('No puede modificar copia con préstamo activo');

  const activeReservation = await findActiveReservationByCopyRepository(id);
  if(activeReservation) throw conflictError('No puede modificar copia con reserva activa');

  const existingCopy = await existingCopyRespository(copyFields.copyNumber, copyFields.editionId,  id);
  const existingSignature = await existingSignatureRepository(copyFields.signatureTopography, id);

  if (existingCopy) throw conflictError('Número de copia ya existe');
  if (existingSignature) throw conflictError("Signatura ya existe");
  
  return await updateCopyRepository(id, copyFields);
};
export const deleteCopyService = async (id) => {
  const selectedCopy = await findCopyByIdRepository(id);

  if (!selectedCopy) throw notFoundError("Copia no encontrada");

  const [ countHistoryReserv, countHistoryLoan ] = await Promise.all([
      countReservationByCopyRepository(id),
      countLoanByCopyRepository(id)
  ])

 if(countHistoryReserv > 0 || countHistoryLoan > 0) throw conflictError('No puede eliminar copia con historial de reserva o de préstamo');
  
  await deleteCopyRepository(id);
  return true;
};
