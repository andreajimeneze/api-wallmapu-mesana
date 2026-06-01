import { baseStatusCopyDTO } from "../copy_status/copy_status.dto.js";
import { baseEditionDTO, editionDetailDTO } from "../editions/edition.dto.js";

export const baseCopyDTO = (res) => {
  if (!res) return null;
  return {
    id_copy: res.idCopy,
    barcode: res.barcode,
    signature_topography: res.signatureTopography,
    copy_number: res.copyNumber,
    edition_id: res.editionId,
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
  edition_id: res.editionId,
  status: baseStatusCopyDTO(res.status),
  created_at: res.created_at,
  updated_at: res.updated_at,
  edition: res.edition ? baseEditionDTO(res.edition) : null,
});

export const copyByBookResponseDTO = (res) => ({
  id_copy: res.idCopy,
  barcode: res.barcode,
  signature_topography: res.signatureTopography,
  copy_number: res.copyNumber,
  edition_id: res.editionId,
  created_at: res.created_at,
  updated_at: res.updated_at,
  status_id: res.statusId,
  status_name: res.status?.name,
  edition_name: res.edition?.edition,
  edition_isbn: res.edition?.isbn,
  edition_cover_image: res.edition?.coverImage,
  editorial_id: res.edition?.editorial?.idEditorial,
  editorial_name: res.edition?.editorial?.name,
  is_availability: res.availability_status === 'disponible',
  availability_status: res.availability_status
});

export const copyResponseDTO = (res) => ({
  id_copy: res.idCopy,
  barcode: res.barcode,
  signature_topography: res.signatureTopography,
  copy_number: res.copyNumber,
  edition_id: res.editionId,
  status_id: res.statusId,
  created_at: res.created_at,
  updated_at: res.updated_at,
  status: res.status.name
});

export const createCopyDTO = ({
  signature_topography,
  copy_number,
  edition_id,
}) => ({
  signatureTopography: signature_topography.trim(),
  barcode: signature_topography.trim(),
  copyNumber: Number(copy_number),
  editionId: Number(edition_id),
  statusId: 1
});

export const updateCopyDTO = ({
  id_copy,
  signature_topography,
  copy_number,
  edition_id,
  status_id
}) => ({
  idCopy: Number(id_copy),
 signatureTopography: signature_topography.trim(),
 barcode: signature_topography.trim(),
 copyNumber:  Number(copy_number),
 editionId:  Number(edition_id),
 statusId: Number(status_id)
});