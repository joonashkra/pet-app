import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateVisit from './CreateVisit';
import { MemoryRouter } from 'react-router-dom';

describe('CreateVisit', () => {
    const accessToken = "mockAccessToken";
    const handleOnSubmitMock = jest.fn();

    const visitDate = new Date();
    visitDate.setDate(visitDate.getDate() + 10); 
    const visitDate1 = visitDate.toISOString().substring(0, 10);

    const mockUpcomingVisit = [
        {
          "id": 1,
          "petId": 1,
          "date": visitDate1,
          "comment": ""
        },
    ]
  
    test('creates new visit with valid data', async () => {

        jest.spyOn(global, "fetch").mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ id: 1 }),
        });
  
        render(
            <MemoryRouter initialEntries={["/pets/1"]}>
                <CreateVisit addVisit={jest.fn()} petId={1} accessToken={accessToken} visits={mockUpcomingVisit}/>
            </MemoryRouter>
        );
    
        await waitFor(() => {
            expect(screen.getByLabelText("New Visit Date")).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Enter comment for visit...')).toBeInTheDocument()
        });

        screen.getByTestId("create-visit-form").onsubmit = handleOnSubmitMock;

        const visitDate = new Date();
        visitDate.setDate(visitDate.getDate() + 20); 
        const newVisitDate = visitDate.toISOString().substring(0, 10);
  
        fireEvent.change(screen.getByLabelText("New Visit Date"), { target: { value: newVisitDate } });
        fireEvent.change(screen.getByPlaceholderText('Enter comment for visit...'), { target: { value: "commentTest" } });
        fireEvent.click(screen.getByTestId("create-visit-btn"));
    
        await waitFor(() => {
            expect(handleOnSubmitMock).toHaveBeenCalled();
        }); 

    });
  
    test('shows error on past visit date', async () => {
        jest.spyOn(global, "fetch").mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ id: 1 }),
        });
  
        render(
            <MemoryRouter initialEntries={["/pets/1"]}>
                <CreateVisit addVisit={jest.fn()} petId={1} accessToken={accessToken} visits={mockUpcomingVisit}/>
            </MemoryRouter>
        );
    
        await waitFor(() => {
            expect(screen.getByLabelText("New Visit Date")).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Enter comment for visit...')).toBeInTheDocument()
        });

        screen.getByTestId("create-visit-form").onsubmit = handleOnSubmitMock;

        const visitDate = new Date();
        visitDate.setDate(visitDate.getDate() - 10); 
        const newVisitDate = visitDate.toISOString().substring(0, 10);
  
        fireEvent.change(screen.getByLabelText("New Visit Date"), { target: { value: newVisitDate } });
        fireEvent.change(screen.getByPlaceholderText('Enter comment for visit...'), { target: { value: "commentTest" } });
        fireEvent.click(screen.getByTestId("create-visit-btn"));
    
        await waitFor(() => {
            expect(screen.getByText("Visit must be for a future date.")).toBeInTheDocument()
        }); 
    });
    test('shows error on already reserved date', async () => {
        jest.spyOn(global, "fetch").mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ id: 1 }),
        });
  
        render(
            <MemoryRouter initialEntries={["/pets/1"]}>
                <CreateVisit addVisit={jest.fn()} petId={1} accessToken={accessToken} visits={mockUpcomingVisit}/>
            </MemoryRouter>
        );
    
        await waitFor(() => {
            expect(screen.getByLabelText("New Visit Date")).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Enter comment for visit...')).toBeInTheDocument()
        });

        screen.getByTestId("create-visit-form").onsubmit = handleOnSubmitMock;
  
        fireEvent.change(screen.getByLabelText("New Visit Date"), { target: { value: visitDate1 } });
        fireEvent.change(screen.getByPlaceholderText('Enter comment for visit...'), { target: { value: "commentTest" } });
        fireEvent.click(screen.getByTestId("create-visit-btn"));
    
        await waitFor(() => {
            expect(screen.getByText("A visit is already reserved for this pet on this date. Please choose a different date.")).toBeInTheDocument()
        }); 
    });
  });