import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ListVisits from './ListVisits';
import { MemoryRouter } from 'react-router-dom';

const visitDate = new Date();
visitDate.setDate(visitDate.getDate() + 10); 
const visitDate1 = visitDate.toISOString().substring(0, 10);

visitDate.setDate(visitDate.getDate() + 50); 
const visitDate2 = visitDate.toISOString().substring(0, 10);

visitDate.setDate(visitDate.getDate() + 100); 
const visitDate3 = visitDate.toISOString().substring(0, 10);

const mockUpcomingVisits = [
    {
      "id": 1,
      "petId": 1,
      "date": visitDate1,
      "comment": ""
    },
    {
      "id": 2,
      "petId": 2,
      "date": visitDate2,
      "comment": ""
    },
    {
        "id": 3,
        "petId": 3,
        "date": visitDate3,
        "comment": ""
    }
]

describe('ListVisits', () => { 
  const accessToken = "mockAccessToken"

  test("renders visits list and sorts in chronological order", async () => {

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUpcomingVisits),
    });

    render(<MemoryRouter><ListVisits accessToken={accessToken} userId={0}/></MemoryRouter>)

    await waitFor(() => {
        expect(screen.getByTestId("visits-tbody")).toBeInTheDocument()
        expect(screen.getByTestId("visits-tbody").children.length).toBeGreaterThan(0);
    });

    const visitRows = screen.getAllByTestId("visits-tr")

    const dates = Array.from(visitRows, (row) => row.children[0].textContent);
    const dateObjects = dates.map((date) => new Date(date.substring(0, 10))); // Only keep the date part

    // expect upcoming visits to be in chronological order the first one being closest to today
    for (let i = 0; i < dateObjects.length - 1; i++) {
        expect(dateObjects[i] < dateObjects[i + 1]).toBe(true);
    }
  })
})