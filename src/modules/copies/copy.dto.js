export const copyResponseDTO = (res) => ({
  id_copy: res.idCopy,
  barcode: res.barcode,
  signature_topography: res.signatureTopography,
  copy_number: res.copyNumber,
  created_at: res.created_at,
  updated_at: res.updated_at,
  editions: res.editions
    ? {
        id_editions: res.editions.ideditions,
        isbn: res.editions.isbn,
        publication_year: res.editions.publicationYear,
        pages: res.editions.pages,
        cover_image: res.editions.coverImage,
        book: res.editions.book
          ? {
              id_book: res.editions.book.idBook,
              title: res.editions.book.title,
              summary: res.editions.book.summary,
              genre: res.editions.book.genre
              ? {
                id_genre: res.editions.book.genre.idGenre,
                name: res.editions.book.genre.name
              } : null,
            }
          : null,
        editorial: res.editions.editorial
          ? {
              id_editorial: res.editions.editorial.idEditorial,
              name: res.editions.editorial.name,
            }
          : null,
      }
    : null,

  status: res.status
    ? {
        id_copy_status: res.status.idStatus,
        name: res.status.name,
      }
    : null
});

export const createCopyDTO = ({barcode, signatureTopography, copyNumber, editionId, statusId}) => {
  return {
    barcode: barcode.trim(),
    signatureTopography: signatureTopography.trim(),
    copyNumber: copyNumber.trim(),
    editionId: Number(editionId),
    statusId: Number(statusId)
  }
};

export const updateCopyDTO = (copy) => {
  return {
    id_copy: Number(copy.idCopy),
    barcode: copy.barcode,
    signatureTopography: copy.signatureTopography,
    copy_number: copy.copyNumber,
    edition_id: Number(copy.editionId),
    status_id: Number(copy.statusId)
  }
}
