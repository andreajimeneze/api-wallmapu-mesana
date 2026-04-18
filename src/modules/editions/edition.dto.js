import { bookBasicDTO, BookDetailDTO } from "../books/book.dto.js";
import { baseCopyDTO } from "../copies/copy.dto.js";
import { baseStatusCopyDTO } from "../copy_status/copy_status.dto.js";
import { baseEditorialDTO } from "../editorials/editorial.dto.js";

export const baseEditionDTO = (res) => ({

  id_edition: res.idEdition,
  edition: res.edition,
  isbn: res.isbn,
  publication_year: res.publicationYear,
  pages: res.pages,
  cover_image: res.coverImage,
  book_id: res.bookId,
  editorial_id: res.editorialId,
  created_at: res.created_at,
  updated_at: res.updated_at,
});

export const editionBasicDTO = (res) => ({
  id_edition: res.idEdition,
  edition: res.edition,
  isbn: res.isbn,
  publication_year: res.publicationYear,
  pages: res.pages,
  cover_image: res.coverImage,
   book_id: res.bookId,
  editorial_id: res.editorialId,
  editorial_name: res.editorial.name
})


export const editionResponseDTO = (res) => {
  if (!res) return null;

  return {
    id_edition: res.idEdition,
    edition: res.edition,
    isbn: res.isbn,
    publication_year: res.publicationYear,
    pages: res.pages,
    cover_image: res.coverImage,
    book_id: res.bookId,
    created_at: res.created_at,
    updated_at: res.updated_at,
    editorial: res.editorial ? baseEditorialDTO(res.editorial) : null,
    book: res.book ? bookBasicDTO(res.book) : null,
    // copies:
    //   res.copies?.map((copy) => ({
    //       ...baseCopyDTO(copy),
    //       status: copy.status ? baseStatusCopyDTO(copy.status) : null
    //     }))
    //     ?? [],
  };
};

export const editionForBookResponseDTO = (res) => ({
    id_edition: res.idEdition,
    edition: res.edition,
    isbn: res.isbn,
    publication_year: res.publicationYear,
    pages: res.pages,
    cover_image: res.coverImage,
    book_id: res.bookId,
    created_at: res.created_at,
    updated_at: res.updated_at,

    book: res.book ? BookDetailDTO(res.book) : null,
    editorial: baseEditorialDTO(res.editorial),
    copies: res.copies ?
      res.copies.map((copy) => ({
        ...baseCopyDTO(copy),
        status: baseStatusCopyDTO(copy.status)
      })) : []
  });

export const createEditionDTO = ({
  edition,
  isbn,
  publication_year,
  pages,
  cover_image,
  book_id,
  editorial_id,
}) => {
  return {
    edition,
    isbn,
    publicationYear: publication_year,
    pages: pages,
    coverImage:
      typeof cover_image === "object" && cover_image !== null
        ? cover_image.url
        : cover_image,
    bookId: Number(book_id),
    editorialId: Number(editorial_id),
  };
};

export const updateEditionDTO = ({
  id_edition,
  edition,
  isbn,
  publication_year,
  pages,
  cover_image,
  book_id,
  editorial_id
}) => {
  return {
    idEdition: id_edition,
    edition: edition.trim(),
    isbn: isbn.trim(),
    publicationYear: Number(publication_year),
    pages: Number(pages),
    coverImage: typeof cover_image === "object" && cover_image !== null
      ? cover_image.url
      : cover_image,
    bookId: Number(book_id),
    editorialId: Number(editorial_id),
  };
};


export const editionDetailDTO = (res) => ({
   id_edition: res.idEdition,
  edition: res.edition,
  isbn: res.isbn,
  publication_year: res.publicationYear,
  pages: res.pages,
  cover_image: res.coverImage,
   book_id: res.bookId,
   editorial: baseEditorialDTO(res.editorial),
});
