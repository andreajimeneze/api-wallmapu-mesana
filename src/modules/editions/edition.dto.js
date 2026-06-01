import { bookBasicDTO, bookDetailDTO } from "../books/book.dto.js";
import { baseCopyDTO } from "../copies/copy.dto.js";
import { baseStatusCopyDTO } from "../copy_status/copy_status.dto.js";
import { baseEditorialDTO } from "../editorials/editorial.dto.js";
import { formatResponseDTO } from "../format/format.dto.js";

export const baseEditionDTO = (res) => ({

  id_edition: res.idEdition,
  edition: res.edition,
  isbn: res.isbn,
  publication_year: res.publicationYear,
  pages: res.pages,
  cover_image: res.coverImage,
  book_id: res.bookId,
  editorial_id: res.editorialId,
  editorial_name: res.editorial.name,
  formats: res.formats ? res.formats.map(formatResponseDTO) : [],
  created_at: res.created_at,
  updated_at: res.updated_at,
});

export const editionDetailDTO = (res) => {
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
  };
};

export const editionForBookResponseDTO = (res) => ({
  id_edition: res.idEdition,
  edition: res.edition,
  isbn: res.isbn,
  publication_year: res.publicationYear,
  pages: res.pages,
  cover_image: res.coverImage,
  format_id: res.formats?.[0]?.idFormat,
  format_name: res.formats?.[0]?.name,
  created_at: res.created_at,
  updated_at: res.updated_at,
  editorial_id: res.editorialId,
  editorial_name: res.editorial.name,
  book_id: res.bookId,
  book_title: res.book.title,
  genre_id: res.book.genreId,
  genre_name: res.book.genre.name,
  author_id: res.book.authors?.[0]?.idAuthor,
  author_name: res.book.authors?.[0]?.name,
  copy_count: res.copies?.length ?? 0
});


export const createEditionDTO = ({
  edition,
  isbn,
  publication_year,
  pages,
  cover_image,
  book_id,
  editorial_id,
}) => ({
    edition: edition.trim(),
    isbn: isbn.trim(),
    publicationYear: publication_year,
    pages: pages,
    coverImage:
      typeof cover_image === "object" && cover_image !== null
        ? cover_image.url
        : cover_image,
    bookId: Number(book_id),
    editorialId: Number(editorial_id),

});

export const updateEditionDTO = ({
  id_edition,
  edition,
  isbn,
  publication_year,
  pages,
  cover_image,
  book_id,
  editorial_id,
  format_ids
}) => {
  return {
    idEdition: Number(id_edition),
    edition: edition.trim(),
    isbn: isbn.trim(),
    publicationYear: Number(publication_year),
    pages: Number(pages),
    coverImage: typeof cover_image === "object" && cover_image !== null
      ? cover_image.url
      : cover_image,
    bookId: Number(book_id),
    editorialId: Number(editorial_id),
    formatIds: format_ids
  };
};

export const editionResponseDTO = (res) => ({
  id_edition: res.idEdition,
  edition: res.edition,
  isbn: res.isbn,
  publication_year: res.publicationYear,
  pages: res.pages,
  cover_image: res.coverImage,
  book_id: res.bookId,
  created_at: res.createdAt,
  updated_at: res.updatedAt,
  editorial: baseEditorialDTO(res.editorial),
});

export const basicResponseEditionWithCopies = (res) => ({
  id_edition: res.idEdition,
  edition: res.edition,
  isbn: res.isbn,
  created_at: res.createdAt,
  cover_image: res.coverImage,
  copies: res.copies ?
    res.copies.map((copy) => ({
      ...baseCopyDTO(copy)
    })) : []
});

export const editionRequestDTO = ({ id_author, id_genre, id_editorial, id_format} = {}) => ({
 
    idAuthor: Number(id_author) || 0,
    idGenre: Number(id_genre) || 0,
    idEditorial: Number(id_editorial) || 0,
    idFormat: Number(id_format) || 0
});