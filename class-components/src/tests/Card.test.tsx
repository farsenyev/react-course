import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResultsComponent } from '../app/components/result/ResultsComponent';
import '@testing-library/jest-dom';

test('renders the relevant card data', () => {
  const item = { name: 'Card 1', description: 'Description 1' };

  render(<ResultsComponent items={[item]} onSelectItem={jest.fn()} />);

  expect(screen.getByText('Card 1')).toBeInTheDocument();
});

test('clicking on a card opens detailed card component', () => {
  const item = { name: 'Card 1', description: 'Description 1' };
  const handleSelectItem = jest.fn();

  render(<ResultsComponent items={[item]} onSelectItem={handleSelectItem} />);

  fireEvent.click(screen.getByText('Card 1'));
  expect(handleSelectItem).toHaveBeenCalledWith(item);
});
