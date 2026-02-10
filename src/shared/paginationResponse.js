export const paginationResponseDTO =
  ({ total, pages, next, prev, result }) => {
    const emptyResult = total === 0;

    return {
      total,
      pages,
      next: emptyResult ? "none" : next,
      prev: emptyResult ? "none" : prev,
      result: emptyResult ? [] : result,
    };
  };
