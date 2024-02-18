import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PetDetails from './PetDetails';
import { MemoryRouter } from 'react-router-dom';

const mockPet = {
    "id": 1,
    "ownerId": 1,
    "name": "Fluffy",
    "petType": "cat",
    "status": "alive",
    "dob": "2022-01-01"
}

const visits = [
    {
      "id": 1,
      "petId": 1,
      "date": "2023-11-06",
      "comment": ""
    },
    {
      "id": 2,
      "petId": 1,
      "date": "2023-31-10",
      "comment": ""
    },
    {
        "id": 3,
        "petId": 1,
        "date": "2024-01-16",
        "comment": ""
    }
]

describe("PetDetails", () => {
    const accessToken = "mockAccessToken"

    test('renders pet details', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockPet),
        });

        render(
            <MemoryRouter initialEntries={["/pets/1"]}>
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

    test("renders visits list and sorts in chronological order", async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockPet),
        });

        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(visits),
        });

        render(
            <MemoryRouter initialEntries={["/pets/1"]}>
                <PetDetails accessToken={accessToken} userId={0}/>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByTestId("pet-visits-tbody")).toBeInTheDocument()
        });

        const petVisitsTBody = screen.getByTestId("pet-visits-tbody");
        expect(petVisitsTBody.children.length).toBeGreaterThan(0);

        const visitRows = screen.getAllByTestId("pet-visits-tr")

        const dates = Array.from(visitRows, (row) => row.children[0].textContent);
        const dateObjects = dates.map((date) => new Date(date.substring(0, 10)));

        // expect past visits to be in chronological order the first one being closest to today
        for (let i = 0; i < dateObjects.length - 1; i++) {
            expect(dateObjects[i] > dateObjects[i + 1]).toBe(true);
        }

    })

    test("doctors only comment visible for doctor", async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockPet),
        });

        render(
            <MemoryRouter initialEntries={["/pets/1"]}>
                <PetDetails accessToken={accessToken} userId={0}/>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByTestId("pet-container")).toBeInTheDocument()
        });

        expect(screen.queryByTestId("doctors-section")).toBeInTheDocument()
    })

    test("doctors only comment not visible for users", async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockPet),
        });

        render(
            <MemoryRouter initialEntries={["/pets/1"]}>
                <PetDetails accessToken={accessToken} userId={1}/>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByTestId("pet-container")).toBeInTheDocument()
        });

        expect(screen.queryByTestId("doctors-section")).not.toBeInTheDocument()
    })
});
