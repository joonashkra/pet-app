import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';
import RequireAuth from './RequireAuth';

describe('mainpage', () => { 

  const accessToken = "mockAccessToken"

  test('renders page', () => {
  
    render(
      <MemoryRouter>
        <MainPage accessToken={accessToken}/>
      </MemoryRouter>
    )
  
    expect(screen.getByText("Pets")).toBeInTheDocument()
    expect(screen.getByText("Visits")).toBeInTheDocument()
    expect(screen.getByText("Log Out")).toBeInTheDocument()
  })
  
  test('renders error message without access token', async () => {

    render(
      <MemoryRouter>
        <RequireAuth><MainPage accessToken={accessToken}/></RequireAuth>
      </MemoryRouter>
    )
  
    await waitFor(() => {
      expect(screen.getByText("Error. Please login.")).toBeInTheDocument()
    })
    
  })
  
  test('clears access token on logout', () => {
    jest.spyOn(global.Storage.prototype, 'getItem').mockReturnValue('accessToken')
    const removeAccessToken = jest.spyOn(global.Storage.prototype, 'removeItem')
  
    render(
      <MemoryRouter>
        <MainPage accessToken={accessToken}/>
      </MemoryRouter>
    )
  
    fireEvent.click(screen.getByText("Log Out"))
    expect(removeAccessToken).toHaveBeenCalledWith('accessToken')
  })
})
