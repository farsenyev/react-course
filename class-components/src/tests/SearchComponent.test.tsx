import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchComponent } from '../app/components/SearchComponent';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('saves entered value to local storage', () => {
    render(
        <BrowserRouter>
            <SearchComponent onSearch={jest.fn()} />
        </BrowserRouter>
    );

    const input = screen.getByPlaceholderText('Search here...');
    fireEvent.change(input, { target: { value: 'Luke' } });

    fireEvent.click(screen.getByText('Search'));
    expect(localStorage.getItem('searchTerm')).toBe('Luke');
});

test('retrieves value from local storage upon mounting', () => {
    localStorage.setItem('searchTerm', 'Luke');

    render(
        <BrowserRouter>
            <SearchComponent onSearch={jest.fn()} />
        </BrowserRouter>
    );

    const input = screen.getByPlaceholderText('Search here...') as HTMLInputElement;
    expect(input.value).toBe('Luke');
});

test('handles page navigation correctly', () => {
    render(
        <BrowserRouter>
            <SearchComponent onSearch={jest.fn()} />
        </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Prev'));
    expect(screen.getByText('1')).toBeInTheDocument();
});
