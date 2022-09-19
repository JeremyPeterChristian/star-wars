import { PeopleResponse } from '../utls/types';
import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';

// takes a page number to pass to the people endpoint via query string
// returns raw response
export const useCharacters = (
  page: number
): UseQueryResult<PeopleResponse, Error> => {
  const queryString = `https://swapi.dev/api/people/?page=${page}`;
  return useQuery([queryString], () =>
    axios.get<PeopleResponse>(queryString).then((res) => {
      if (res.status !== 200) {
        throw new Error(`${res.status}`);
      }
      return res.data;
    })
  );
};

// returns the maximum number of pages needed to show all available characters from the people endpoint
export const usePaginationMetrics = (): UseQueryResult<
  { pageLimit: number; count: number },
  Error
> => {
  const queryString = `https://swapi.dev/api/people/`;
  return useQuery([queryString], () =>
    axios.get<PeopleResponse>(queryString).then((res) => {
      if (res.status !== 200) {
        throw new Error(`${res.status}`);
      }

      const { count, results } = res.data;

      // total pages is number of characters on record divided by the number of results given per request
      // add an additional page for remaining characters
      const pageLimit =
        Math.floor(count / results.length) +
        (count % results.length > 0 ? 1 : 0);

      return { pageLimit, count };
    })
  );
};
