import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ListPets from './ListPets';
import { MemoryRouter } from 'react-router-dom';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom')),
    useNavigate: () => mockedUsedNavigate,
}))

const mockPets = [
  {
    "id": 1,
    "ownerId": 1,
    "name": "Fluffy",
    "petType": "Cat",
    "status": "alive",
    "dob": "2022-01-01"
  },
  {
    "id": 2,
    "ownerId": 2,
    "name": "Rex",
    "petType": "Dog",
    "status": "alive",
    "dob": "2023-01-01"
  },
  {
    "id": 3,
    "ownerId": 3,
    "name": "Max",
    "petType": "Dog",
    "status": "deceased",
    "dob": "2021-01-01"
  }
]


describe('ListPets', () => { 
  const accessToken = "mockAccessToken"

  test('lists pets', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPets),
    });

    render(<MemoryRouter><ListPets accessToken={accessToken} userId={0}/></MemoryRouter>)

    await waitFor(() => {
      expect(screen.getByTestId("pet-tbody")).toBeInTheDocument();
      const petTbody = screen.getByTestId("pet-tbody");
      expect(petTbody.children.length).toBeGreaterThan(0);
    });
  })

  test('navigates to pet details on click', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPets),
    });

    render(<MemoryRouter><ListPets accessToken={accessToken} userId={0}/></MemoryRouter>)
    await waitFor(() => {
      const firstPetTr = screen.getAllByTestId("pet-tr")[0];
      expect(firstPetTr).toBeInTheDocument();
      fireEvent.click(firstPetTr);
      expect(mockedUsedNavigate).toBeCalled()
    })
  })

  test('checkbox works', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPets),
    });
    
    render(<MemoryRouter><ListPets accessToken={accessToken} userId={0}/></MemoryRouter>)
    
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