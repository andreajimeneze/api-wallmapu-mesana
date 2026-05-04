export const normalizePagination = (page, limit) => {
  const DEFAULT_LIMIT = 10;
  const MAX_LIMIT = 100;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || DEFAULT_LIMIT;

  if (page < 1) page = 1;
  if (limit < 1) limit = DEFAULT_LIMIT;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  return { page, limit };
};