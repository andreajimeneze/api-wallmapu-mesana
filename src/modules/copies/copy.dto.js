import { baseBookDTO } from "../books/book.dto.js";
import { baseStatusCopyDTO } from "../copy_status/copy_status.dto.js";
import { baseEditionDTO } from "../editions/edition.dto.js";
import { baseEditorialDTO } from "../editorials/editorial.dto.js";

export const baseCopyDTO = (res) => {
  if (!res) return null;
  return {
    id_copy: res.idCopy,
    barcode: res.barcode,
    signature_topography: res.signatureTopography,
    copy_number: res.copyNumber,
    status_id: res.statusId,
    created_at: res.created_at,
    updated_at: res.updated_at,
  };
};

export const copyJoinResponseDTO = (res) => ({
  id_copy: res.idCopy,
  barcode: res.barcode,
  signature_topography: res.signatureTopography,
  copy_number: res.copyNumber,
  status: baseStatusCopyDTO(res.status),
  created_at: res.created_at,
  updated_at: res.updated_at,
  editions: res.editions ? baseEditionDTO(res.editions) : null,
  editorial: res.editions?.editorial ? baseEditorialDTO(res.editions.editorial) : null,
  book: res.editions?.book ? baseBookDTO(res.editions.book) : null,
});

export const copyResponseDTO = (res) => ({
  id_copy: res.idCopy,
  barcode: res.barcode,
  signature_topography: res.signatureTopography,
  copy_number: res.copyNumber,
  created_at: res.created_at,
  updated_at: res.updated_at,
  edition_id: res.editionId,
  status_id: res.statusId,
});

export const createCopyDTO = ({
  signature_topography,
  copy_number,
  edition_id,
  status_id,
}) => {
  return {
    signatureTopography: signature_topography,
    copyNumber: Number(copy_number),
    editionId: Number(edition_id),
    statusId: Number(status_id),
  };
};

export const updateCopyDTO = ({
  //id_copy,
  signature_topography,
  copy_number,
  edition_id,
  status_id,
}) => {
  return {
    //idCopy: Number(id_copy),
    signatureTopography: signature_topography,
    copyNumber: Number(copy_number),
    editionId: Number(edition_id),
    statusId: Number(status_id),
  };
};
