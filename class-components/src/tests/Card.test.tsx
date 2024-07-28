import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResultsComponent } from '../app/components/result/ResultsComponent';
import { IPeopleAPI } from '../app/interfaces/people.interface';
import { Provider } from 'react-redux';
import { store } from '../app/store/Store';

const mockItems: IPeopleAPI = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
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
    },
  ],
};

const emptyItems: IPeopleAPI = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

const handleSelectItem = jest.fn();

describe('ResultsComponent', () => {
  it('renders "No results found" when items is empty', () => {
    render(
      <Provider store={store}>
        <ResultsComponent items={emptyItems} onSelectItem={handleSelectItem} />
      </Provider>,
    );
    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });

  it('renders "No results found" when items is undefined', () => {
    render(
      <Provider store={store}>
        <ResultsComponent
          items={undefined as unknown as IPeopleAPI}
          onSelectItem={handleSelectItem}
        />
      </Provider>,
    );
    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });

  it('renders items correctly and handles item click', () => {
    render(
      <Provider store={store}>
        <ResultsComponent items={mockItems} onSelectItem={handleSelectItem} />
      </Provider>,
    );

    const item = screen.getByText(/Luke Skywalker/i);
    expect(item).toBeInTheDocument();

    fireEvent.click(item);
    expect(handleSelectItem).toHaveBeenCalledWith(mockItems.results[0]);
  });

  it('does not call onSelectItem if item is clicked with an empty items list', () => {
    render(
      <Provider store={store}>
        <ResultsComponent items={emptyItems} onSelectItem={handleSelectItem} />
      </Provider>,
    );

    const noResults = screen.getByText(/No results found/i);
    expect(noResults).toBeInTheDocument();

    fireEvent.click(noResults);
    expect(handleSelectItem).toHaveBeenCalled();
  });
});
