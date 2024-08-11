import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DetailComponent } from '../app/components/details/DetailComponent';
import { setupApiStore } from './helpers/setupApiStore';
import { IPeople } from '../app/interfaces/people.interface';

const mockPeopleData: IPeople = {
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

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1', category: 'people' }),
  useNavigate: () => jest.fn(),
}));

jest.mock('../app/service/ItemService', () => ({
  ...jest.requireActual('../app/service/ItemService'),
  useGetDetailsQuery: jest.fn().mockImplementation(() => ({
    data: mockPeopleData,
    isLoading: false,
    isFetching: false,
  })),
}));

describe('DetailComponent', () => {
  let store: ReturnType<typeof setupApiStore>;

  beforeEach(() => {
    store = setupApiStore();
  });

  it('правильно рендерит данные', async () => {
    jest.mock('../app/service/ItemService', () => ({
      ...jest.requireActual('../app/service/ItemService'),
      useGetDetailsQuery: jest.fn().mockImplementation(() => ({
        data: mockPeopleData,
        isLoading: false,
        isFetching: false,
      })),
    }));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <DetailComponent />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => {
      const elements = screen.getAllByText(/Luke Skywalker/i);
      expect(elements).toHaveLength(2);
      elements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
      expect(screen.getByText(/height: 172/i)).toBeInTheDocument();
      expect(screen.getByText(/mass: 77/i)).toBeInTheDocument();
    });
  });
});
