import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (build) => ({
    getItems: build.query({
      query: ({ item, page }) => (page ? `/${item}/?page=${page}` : `/${item}`),
    }),
    getDetails: build.query({
      query: ({ category, id }) => `/${category}/${id}/`,
    }),
  }),
});

export const { useGetItemsQuery, useGetDetailsQuery } = itemsApi;
