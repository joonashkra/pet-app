import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';

describe('mainpage', () => { 
  test('renders list of pets with accesstoken', () => {
    jest.spyOn(global.Storage.prototype, 'getItem').mockReturnValue('accessToken')
  
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
  
    expect(screen.getByText(/Error. Page not found./i)).toBeInTheDocument()
  })
  
  test('clears access token on logout', () => {
    jest.spyOn(global.Storage.prototype, 'getItem').mockReturnValue('accessToken')
    const removeAccessToken = jest.spyOn(global.Storage.prototype, 'removeItem')
  
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    )
  
    fireEvent.click(screen.getByText(/Log Out/i))
    expect(removeAccessToken).toHaveBeenCalledWith('accessToken')
  })

})
