// Includes info about the pet, info about the owner and a list of all the visits the pet has had at our clinic
// The visits list is ordered in chronological order, with most recent at the top.
// Includes doctors only comment, which is not shown to the pet owner
// Includes Create pet function

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PetDetails from './PetDetails';
import { MemoryRouter } from 'react-router-dom';

const mockPet = {
    id: 123,
    ownerId: 1,
    name: 'Fluffy',
    petType: 'Cat',
    status: 'alive',
    dob: '2022-01-01',
};

describe("PetDetails", () => {
    const accessToken = "mockAccessToken"

    test('renders pet details', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockPet),
        });

        render(
            <MemoryRouter initialEntries={["/pets/123"]}>
                <PetDetails accessToken={accessToken} userId={0}/>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByTestId("pet-container")).toBeInTheDocument();
        });

        expect(screen.getByText("Fluffy's Details")).toBeInTheDocument();
        const petDetailsTBody = screen.getByTestId("pet-details-tbody");
        expect(petDetailsTBody.children.length).toBeGreaterThan(0);
    });
});
