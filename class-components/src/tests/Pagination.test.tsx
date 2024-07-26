import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchComponent } from '../app/components/header/SearchComponent';
import { BrowserRouter } from 'react-router-dom';

test('updates URL query parameter when page changes', () => {
  const mockOnSearch = jest.fn();

  render(
    <BrowserRouter>
      <SearchComponent onSearch={mockOnSearch} />
    </BrowserRouter>,
  );

  fireEvent.click(screen.getByText('Next'));
  expect(mockOnSearch).toHaveBeenCalledWith(expect.anything(), 2);

  fireEvent.click(screen.getByText('Prev'));
  expect(mockOnSearch).toHaveBeenCalledWith(expect.anything(), 1);
});
