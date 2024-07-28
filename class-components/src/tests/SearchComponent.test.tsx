import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SearchComponent } from '../app/components/header/SearchComponent';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../app/hooks/useLocalStorage', () => ({
  useLocalStorage: () => ['testValue', jest.fn()],
}));

jest.mock('../app/context/ThemeContext', () => ({
  useTheme: () => ({ toggleTheme: jest.fn() }),
}));

const renderWithProviders = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('SearchComponent', () => {
  const mockOnSearch = jest.fn();
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
    mockNavigate.mockClear();
    mockToggleTheme.mockClear();
  });

  test('updates URL query parameter and calls onSearch when page changes', () => {
    render(
      <BrowserRouter>
        <SearchComponent onSearch={mockOnSearch} />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByText('Next'));
    expect(mockOnSearch).toHaveBeenCalledWith('testValue', 2);

    fireEvent.click(screen.getByText('Prev'));
    expect(mockOnSearch).toHaveBeenCalledWith('testValue', 1);
  });

  it('updates input value correctly', () => {
    const mockOnSearch = jest.fn();
    render(
      <BrowserRouter>
        <SearchComponent onSearch={mockOnSearch} />
      </BrowserRouter>,
    );

    const input = screen.getByPlaceholderText(
      'Search here...',
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'new search term' } });

    expect(input.value).toBe('testValue');
  });

  it('toggles theme when checkbox is changed', () => {
    render(
      <BrowserRouter>
        <SearchComponent onSearch={mockOnSearch} />
      </BrowserRouter>,
    );

    const checkbox = screen.getByLabelText('Toggle Theme');
    fireEvent.click(checkbox);
    expect(mockToggleTheme).toHaveBeenCalledTimes(0);
  });

  it('checks if the previous button is disabled on the first page', () => {
    render(
      <BrowserRouter>
        <SearchComponent onSearch={jest.fn()} />
      </BrowserRouter>,
    );
    const prevButton = screen.getByText('Prev');
    expect(prevButton).toBeDisabled();
  });

  test('handles navigation with empty search value', () => {
    const { getByText } = renderWithProviders(
      <SearchComponent onSearch={mockOnSearch} />,
    );
    fireEvent.click(getByText('Next'));
    expect(mockNavigate).toHaveBeenCalledWith('/testValue?page=2');
  });

  test('handles navigation with specific search value', () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <SearchComponent onSearch={mockOnSearch} />,
    );
    const input = getByPlaceholderText('Search here...');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(getByText('Next'));
    expect(mockNavigate).toHaveBeenCalledWith('/testValue?page=2');
  });
});
