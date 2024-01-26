import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';

test('renders content based on access token', () => {
  jest.spyOn(global.Storage.prototype, 'getItem').mockReturnValue('dummyAccessToken')

  render(
    <MemoryRouter>
      <MainPage />
    </MemoryRouter>
  )

  expect(screen.getByText(/Pets/i)).toBeInTheDocument()
})

test('renders error message without access token', () => {
  jest.spyOn(global.Storage.prototype, 'getItem').mockReturnValue(null)

  render(
    <MemoryRouter>
      <MainPage />
    </MemoryRouter>
  )

  expect(screen.getByText(/Error. Please log in./i)).toBeInTheDocument()
})

test('clears access token when log out', () => {
  jest.spyOn(global.Storage.prototype, 'getItem').mockReturnValue('dummyAccessToken')
  const removeItemSpy = jest.spyOn(global.Storage.prototype, 'removeItem')

  render(
    <MemoryRouter>
      <MainPage />
    </MemoryRouter>
  )

  fireEvent.click(screen.getByText(/Log Out/i))
  expect(removeItemSpy).toHaveBeenCalledWith('accessToken')
})