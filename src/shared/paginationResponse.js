export const paginationResponseDTO = ({ count, pages, next, prev, result }) => ({
  items: count,
  pages,
  next,
  prev,
  result
});