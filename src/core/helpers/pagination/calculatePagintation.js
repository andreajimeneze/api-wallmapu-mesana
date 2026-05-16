export const calculatePagination = (items, page, limit) => {
  const pages = items > 0 ? Math.ceil(items / limit) : 0;
  const safePage = pages > 0 ? Math.min(page, pages) : 1;
  const offset = (safePage - 1) * limit;

  return { pages, page: safePage, offset };
};