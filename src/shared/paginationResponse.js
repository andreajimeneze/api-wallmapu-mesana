export const paginationResponseDTO =
  ({ items, pages, next, prev, result }) => {
    const emptyResult = items === 0;

    return {
      items,
      pages,
      next: emptyResult ? "none" : next,
      prev: emptyResult ? "none" : prev,
      result: emptyResult ? [] : result,
    };
  };
