import { baseCopyDTO } from "../copies/copy.dto.js";
import { baseEditorialDTO } from "../editorials/editorial.dto.js";
import { baseGenreDTO } from "../genres/genre.dto.js";
import { baseAuthorDTO } from "../authors/author.dto.js";
import { baseSubjectDTO } from "../subjects/subject.dto.js";
import { baseEditionDTO } from "../editions/edition.dto.js";
import { baseStatusCopyDTO } from "../copy_status/copy_status.dto.js";

export const baseBookDTO = (res) => ({
  id_book: res.idBook,
  title: res.title,
  summary: res.summary,
  genre_id: res.genreId,
  created_at: res.created_at,
  updated_at: res.updated_at,
});

export const bookResponseDTO = (res) => ({
  ...baseBookDTO(res),
  genre: res.genre ? baseGenreDTO(res.genre) : null,
  authors: res.authors
    ? res.authors.map(baseAuthorDTO)
    : [],

  subjects: res.subjects
    ? res.subjects.map(baseSubjectDTO)
    : [],

  editions: res.editions
    ? res.editions.map((edition) => ({
      ...baseEditionDTO(edition),
      editorial: baseEditorialDTO(edition.editorial),
      copies: edition.copies ? edition.copies.map((copy) => ({
        ...baseCopyDTO(copy),
        status: baseStatusCopyDTO(copy.status)
      })) : []
    }))
    : []
});

export const createBookDTO = ({ title,
  summary,
  genre_id,
  authors = [],
  subjects = [] }) => ({

    title: title.trim() || '',
    summary: summary || '',
    genreId: Number(genre_id),
    authors: authors.map(author => Number(author.id_author)),
    subjects: subjects.map(subject => Number(subject.id_subject))

});

export const updateBookDTO = ({  title, summary, genreId, authors = [], subjects = [] }) => {
  return {
    title: title.trim(),
    summary,
    genre_id: genreId ? Number(genreId) : undefined,
    authors: authors.map(author => Number(author.id_author)),
    subjects: subjects.map(subject => Number(subject.id_subject))
  }
};


export const bookDetailDTO = (book) => {
  if (!book) return null;

  return {
    id_book: book.idBook,
    title: book.title,
    summary: book.summary,
    genre_id: book.genreId,
     created_at: book.created_at,
  updated_at: book.updated_at,
    authors: book.authors
      ? book.authors.map(baseAuthorDTO)
      : [],

    subjects: book.subjects
      ? book.subjects.map(baseSubjectDTO)
      : [],
    genre: baseGenreDTO(book.genre),
  }
};

export const bookBasicDTO = (book) => {
  if (!book) return null;

  return {
    id_book: book.idBook,
    title: book.title,
    summary: book.summary,
    genre_id: book.genreId,
     created_at: book.created_at,
  updated_at: book.updated_at,
    authors: book.authors
      ? book.authors.map(baseAuthorDTO)
      : [],

    subjects: book.subjects
      ? book.subjects.map(baseSubjectDTO)
      : [],
  }
};

export const mapBookDTO = (book) => {
  return {
    id_book: book.id_book,
    title: book.title,

    genre_id: book.genre_id,
    genre_name: book.genre?.name ?? null,

    author_id: book.author_id,
    author_name: book.author?.name ?? null,

    edition_cover_image:
      book.editions?.[0]?.cover_image ?? null,

    edition_count: Number(book.edition_count),
    copy_count: Number(book.copy_count),

    created_at: book.created_at,
    updated_at: book.updated_at,
  };
};