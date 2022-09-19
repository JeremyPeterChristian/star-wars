import Router from 'next/router';
import { ParsedUrlQuery } from 'querystring';

export const handlePageMetrics = (
  isLoading: boolean,
  pageLimit: number | undefined,
  query: ParsedUrlQuery,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
  if (!isLoading && pageLimit) {
    // if page is not a number, resolve to 1
    const page = parseInt((query?.page as string) ?? '1');
    // if page is over the page limit, resolve to page limit
    if (page > pageLimit) {
      Router.push({ query: { page: pageLimit } });
      setCurrentPage(pageLimit);
    }
    // if page is under 1 or is NaN, resolve to 1
    else if (page < 1 || isNaN(page)) {
      Router.push({ query: { page: 1 } });
      setCurrentPage(1);
    }
    // otherwise set page using query parameter
    else {
      setCurrentPage(page);
    }
  }
};
