import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IStarships, IStarshipsApi } from '../interfaces/starships.interface';
import { IFilm, IFilmsApi } from '../interfaces/films.interface';
import { IPeople, IPeopleAPI } from '../interfaces/people.interface';

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (build) => ({
    getItems: build.query<
      IPeopleAPI | IFilmsApi | IStarshipsApi,
      { item: string; page: number }
    >({
      query: ({ item, page }) => (page ? `/${item}/?page=${page}` : `/${item}`),
    }),
    getDetails: build.query<
      IPeople | IFilm | IStarships,
      { category: string; id: string }
    >({
      query: ({ category, id }) => `/${category}/${id}/`,
    }),
  }),
});

export const { useGetItemsQuery, useGetDetailsQuery } = itemsApi;
