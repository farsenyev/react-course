import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { DetailComponent } from '../app/components/details/DetailedComponent';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1', category: 'people' }),
  useNavigate: () => mockNavigate, // Mock the useNavigate function here
}));

beforeEach(() => {
  fetchMock.resetMocks();
  mockNavigate.mockReset(); // Ensure the navigate mock is reset before each test
});

test('displays loading indicator while fetching data', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({ name: 'Luke Skywalker', films: [] }),
  );

  render(
    <BrowserRouter>
      <DetailComponent />
    </BrowserRouter>,
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() =>
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument(),
  );
});

test('displays detailed card data', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({ name: 'Luke Skywalker', films: [] }),
  );

  render(
    <BrowserRouter>
      <DetailComponent />
    </BrowserRouter>,
  );

  await waitFor(() =>
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument(),
  );
});

test('displays films associated with the item', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({
      name: 'Luke Skywalker',
      films: ['https://swapi.dev/api/films/1/'],
    }),
  );

  fetchMock.mockResponseOnce(JSON.stringify({ title: 'A New Hope' }));

  render(
    <BrowserRouter>
      <DetailComponent />
    </BrowserRouter>,
  );

  await waitFor(() =>
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument(),
  );
  await waitFor(() =>
    expect(screen.getByText('Films: A New Hope')).toBeInTheDocument(),
  );
});

test('handles fetch error', async () => {
  fetchMock.mockReject(new Error('Failed to fetch'));

  render(
    <BrowserRouter>
      <DetailComponent />
    </BrowserRouter>,
  );

  await waitFor(() =>
    expect(screen.getByText('No details available.')).toBeInTheDocument(),
  );
});

test('clicking close button navigates back', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({ name: 'Luke Skywalker', films: [] }),
  );

  render(
    <BrowserRouter>
      <DetailComponent />
    </BrowserRouter>,
  );

  await waitFor(() =>
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument(),
  );

  fireEvent.click(screen.getByText(/close/i));
  expect(mockNavigate).toHaveBeenCalledWith(-1);
});
