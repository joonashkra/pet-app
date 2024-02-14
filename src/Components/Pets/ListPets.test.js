import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListPets from './ListPets';
import { MemoryRouter } from 'react-router-dom';

test('renders table with fetched data', async () => {
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6ImRvY3RvciIsImlhdCI6MTUxNjIzOTAyMn0.0_MKcjJoHX-Vsjb4vVlWZLZMY-45nMQ22MTXUCAQgng"

    render(<MemoryRouter><ListPets accessToken={accessToken}/></MemoryRouter>)

    await screen.findAllByTestId('pet-tr')

    const petTableElements = screen.getAllByTestId('pet-tr')
  
    expect(petTableElements.length).toBeGreaterThan(0)

    petTableElements.forEach((element) => {
      expect(element).toBeInTheDocument()
    })
})