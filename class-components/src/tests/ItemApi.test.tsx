import { itemsApi } from '../app/service/ItemService';
import { IPeople } from '../app/interfaces/people.interface';
import { setupApiStore, SetupApiStore } from './helpers/setupApiStore';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';

const people: IPeople = {
  id: '1',
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  eye_color: 'blue',
  films: ['some-url'],
  gender: 'male',
  hair_color: 'blond',
  height: '172',
  homeworld: 'some-url',
  mass: '77',
  skin_color: 'fair',
  created: 'some-date',
  edited: 'some-date',
  species: ['some-url'],
  starships: ['some-url'],
  url: 'some-url',
  vehicles: ['some-url'],
};

jest.mock('@reduxjs/toolkit/query/react', () => {
  const originalModule = jest.requireActual('@reduxjs/toolkit/query/react');

  const mockBaseQuery: BaseQueryFn<
    string | { url: string; method?: string },
    unknown,
    unknown
  > = async (args) => {
    const url = typeof args === 'string' ? args : args.url;

    if (url === '/people/?page=1') {
      return Promise.resolve({
        data: { count: 1, results: [people] },
      });
    }
    if (url === '/people/1/') {
      return Promise.resolve({
        data: people,
      });
    }
    return Promise.reject(new Error('Path not found'));
  };

  return {
    ...originalModule,
    fetchBaseQuery: () => mockBaseQuery,
  };
});

describe('itemsApi tests', () => {
  let store: SetupApiStore;

  beforeEach(() => {
    store = setupApiStore();
  });

  it('successfully fetches items', async () => {
    const result = await store.dispatch(
      itemsApi.endpoints.getItems.initiate({ item: 'people', page: 1 }),
    );
    expect(result.data).toEqual({
      count: 1,
      results: [people],
    });
  });

  it('fetches item details successfully', async () => {
    const result = await store.dispatch(
      itemsApi.endpoints.getDetails.initiate({ category: 'people', id: '1' }),
    );
    expect(result.data).toEqual(people);
  });
});
