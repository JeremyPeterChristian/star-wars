import { Character } from '../types';
import { useQuery } from 'react-query';
import axios from 'axios';

export const useCharacters = (page: number) => {
  const queryString = `https://swapi.dev/api/people/?page=${page}`;
  return useQuery([queryString], () =>
    axios.get<{ results: Character[] }>(queryString).then((res) => res.data)
  );
};

export const usePaginationMetrics = () => {
  const queryString = `https://swapi.dev/api/people/`;
  return useQuery([queryString], () =>
    axios.get(queryString).then((res) => {
      const { count, results } = res.data;
      const numPages = count % results.length;
      return numPages;
    })
  );
};
