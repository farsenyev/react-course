import React from 'react';
import { render, screen } from '@testing-library/react';
import { ResultsComponent } from '../app/components/result/ResultsComponent';
import '@testing-library/jest-dom';

test('renders the specified number of cards', () => {
  const items = [
    { name: 'Card 1', description: 'Description 1' },
    { name: 'Card 2', description: 'Description 2' },
  ];

  render(<ResultsComponent items={items} onSelectItem={jest.fn()} />);

  const cards = screen.getAllByRole('heading');
  expect(cards).toHaveLength(2);
});

test('displays appropriate message if no cards are present', () => {
  render(<ResultsComponent items={[]} onSelectItem={jest.fn()} />);

  expect(screen.getByText(/no cards available/i)).toBeInTheDocument();
});
