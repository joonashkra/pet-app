import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ListPets from './ListPets';
import { MemoryRouter } from 'react-router-dom';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom')),
    useNavigate: () => mockedUsedNavigate,
}))

describe('ListPets', () => { 
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6ImRvY3RvciIsImlhdCI6MTUxNjIzOTAyMn0.0_MKcjJoHX-Vsjb4vVlWZLZMY-45nMQ22MTXUCAQgng"

  test('lists pets', async () => {
    render(<MemoryRouter><ListPets accessToken={accessToken}/></MemoryRouter>)
    await waitFor(() => {
      expect(screen.getByText("Pets")).toBeInTheDocument();
      const petTbody = screen.getByTestId("pet-tbody");
      expect(petTbody.children.length).toBeGreaterThan(0);
    });
  })

  test('navigates to pet details on click', async () => {
    render(<MemoryRouter><ListPets accessToken={accessToken}/></MemoryRouter>)
    await waitFor(() => {
      const firstPetTr = screen.getAllByTestId("pet-tr")[0];
      expect(firstPetTr).toBeInTheDocument();
      fireEvent.click(firstPetTr);
      expect(mockedUsedNavigate).toBeCalled()
    })
  })

  test('checkbox works', async () => {
    render(<MemoryRouter><ListPets accessToken={accessToken}/></MemoryRouter>)
    await waitFor(() => {
      expect(screen.getByTestId("filter-checkbox")).toBeInTheDocument()
      const checkbox = screen.getByTestId("filter-checkbox");
      expect(checkbox).toBeChecked();
      const initialPetRows = screen.getAllByTestId("pet-tr").length;
      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
      expect(screen.getAllByTestId("pet-tr").length).toBeGreaterThan(initialPetRows);
    })
  })
})