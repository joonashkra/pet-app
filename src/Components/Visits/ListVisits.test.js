import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListVisits from './ListVisits';
import { MemoryRouter } from 'react-router-dom';

test('renders table with fetched data', async () => {
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6ImRvY3RvciIsImlhdCI6MTUxNjIzOTAyMn0.0_MKcjJoHX-Vsjb4vVlWZLZMY-45nMQ22MTXUCAQgng"

    render(<MemoryRouter><ListVisits accessToken={accessToken}/></MemoryRouter>)

    await screen.findAllByTestId('visit-tr')

    const visitTableElements = screen.getAllByTestId('visit-tr')
  
    expect(visitTableElements.length).toBeGreaterThan(0)

    visitTableElements.forEach((element) => {
      expect(element).toBeInTheDocument()
    })
})