import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UpdatePet from './UpdatePet';

const mockPet = {
    "id": 1,
    "ownerId": 1,
    "name": "Fluffy",
    "petType": "cat",
    "status": "alive",
    "dob": "2022-01-01"
}

describe("UpdatePet", () => {

    test('updates pet status correctly', async () => {
        const mockAccessToken = 'mockAccessToken';
      
        render(
          <MemoryRouter>
            <UpdatePet petId={mockPet.id} petStatus={mockPet.status} accessToken={mockAccessToken}/>
          </MemoryRouter>
        );

        jest.spyOn(global, 'fetch').mockResolvedValueOnce({ ok: true });
      
        await waitFor(() => {
          expect(screen.getByRole("combobox")).toBeInTheDocument();
        });
      
        const selectElement = screen.getByRole('combobox');
        fireEvent.change(selectElement, { target: { value: 'deceased' } });

        fireEvent.click(screen.getByText('Save New Status'));

        expect(global.fetch).toHaveBeenCalledWith(
            `http://localhost:4000/pets/${1}`,
            expect.objectContaining({
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${mockAccessToken}`,
              },
              body: JSON.stringify({ status: 'deceased' }),
            })
          );
            
    })
})