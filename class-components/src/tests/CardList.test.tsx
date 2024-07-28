import React from 'react';
import { render, screen } from '@testing-library/react';
import { ResultsComponent } from '../app/components/result/ResultsComponent';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { IPeopleAPI } from "../app/interfaces/people.interface";

const mockStore = configureStore();
const initialState = {
    items: {
        items: []
    }
};

test('renders the specified number of cards', () => {
    const items: IPeopleAPI = {
        count: 2,
        next: null,
        previous: null,
        results: [
            { id: "1", name: "John Doe", birth_year: "2000", eye_color: "blue", films: [], gender: "male", hair_color: "black", height: "170", homeworld: "", mass: "70", skin_color: "white", created: "", edited: "", species: [], starships: [], url: "", vehicles: [] },
            { id: "2", name: "Jane Doe", birth_year: "2001", eye_color: "green", films: [], gender: "female", hair_color: "blonde", height: "165", homeworld: "", mass: "55", skin_color: "light", created: "", edited: "", species: [], starships: [], url: "", vehicles: [] }
        ]
    };

    const store = mockStore(initialState);

    render(
        <Provider store={store}>
            <ResultsComponent items={items} onSelectItem={jest.fn()} />
        </Provider>
    );

    const cards = screen.getAllByRole('heading');
    expect(cards).toHaveLength(2);
});
