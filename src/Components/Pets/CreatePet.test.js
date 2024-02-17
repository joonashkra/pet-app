import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreatePet from './CreatePet';
import { MemoryRouter } from 'react-router-dom';
import ListPets from './ListPets';

describe('CreatePet', () => {
  const accessToken = "mockAccessToken";
  const handleOnSubmitMock = jest.fn();

  test('creates new pet with valid data', async () => {
        render(
        <MemoryRouter>
            <ListPets accessToken={accessToken} userId={1}/>
        </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByPlaceholderText("Enter pet type...")).toBeInTheDocument();
            expect(screen.getByPlaceholderText("Enter name...")).toBeInTheDocument();
            expect(screen.getByLabelText("Date of Birth")).toBeInTheDocument();
            expect(screen.getByTestId("create-pet-form")).toBeInTheDocument();
        });

        screen.getByTestId("create-pet-form").onsubmit = handleOnSubmitMock;

        fireEvent.change(screen.getByPlaceholderText('Enter pet type...'), { target: { value: "typeTest" } });
        fireEvent.change(screen.getByPlaceholderText('Enter name...'), { target: { value: "nameTest" } });
        fireEvent.change(screen.getByLabelText("Date of Birth"), { target: { value: "2023-12-31" } });

        fireEvent.click(screen.getByTestId("create-pet-btn"));

        await waitFor(() => {
            expect(handleOnSubmitMock).toHaveBeenCalled();
        })
    });

  test('shows error on invalid data', async () => {
    render(
      <MemoryRouter>
        <CreatePet accessToken={accessToken} />
      </MemoryRouter>
    );
  
    // Wait for the form elements to be present
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Enter pet type...")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Enter name...")).toBeInTheDocument();
      expect(screen.getByLabelText("Date of Birth")).toBeInTheDocument();
      expect(screen.getByTestId("create-pet-btn")).toBeInTheDocument();
    });
  
    // Test for null pet type
    fireEvent.change(screen.getByPlaceholderText('Enter pet type...'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Enter name...'), { target: { value: 'nameTest' } });
    fireEvent.change(screen.getByLabelText("Date of Birth"), { target: { value: "2023-12-31" } });
    fireEvent.click(screen.getByTestId("create-pet-btn"));
    await waitFor(() => {
        expect(handleOnSubmitMock).not.toHaveBeenCalled();
        expect(screen.getByTestId("error-msg")).toBeInTheDocument();
    });
  
    // Test for null pet name
    fireEvent.change(screen.getByPlaceholderText('Enter pet type...'), { target: { value: 'typeTest' } });
    fireEvent.change(screen.getByPlaceholderText('Enter name...'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText("Date of Birth"), { target: { value: "2023-12-31" } });
    fireEvent.click(screen.getByTestId("create-pet-btn"));
    await waitFor(() => {
        expect(handleOnSubmitMock).not.toHaveBeenCalled();
        expect(screen.getByTestId("error-msg")).toBeInTheDocument();
    });
  
    // Test for future birth date
    fireEvent.change(screen.getByPlaceholderText('Enter pet type...'), { target: { value: 'typeTest' } });
    fireEvent.change(screen.getByPlaceholderText('Enter name...'), { target: { value: 'nameTest' } });
    fireEvent.change(screen.getByLabelText("Date of Birth"), { target: { value: "2025-12-31" } });
    fireEvent.click(screen.getByTestId("create-pet-btn"));
    await waitFor(() => {
        expect(handleOnSubmitMock).not.toHaveBeenCalled();
        expect(screen.getByTestId("error-msg")).toBeInTheDocument();
    });
  });
});
