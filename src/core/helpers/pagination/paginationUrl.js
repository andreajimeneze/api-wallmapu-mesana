export const paginationUrl = (basePath, page, pages, limit, search) => {
  return {
    next: page < pages
      ? `${basePath}?page=${page + 1}&items=${limit}&search=${search ?? ""}`
      : null,
    prev: page > 1
      ? `${basePath}?page=${page - 1}&items=${limit}&search=${search ?? ""}`
      : null,
  };
};