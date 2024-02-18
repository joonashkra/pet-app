import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreatePet from './CreatePet';
import { MemoryRouter } from 'react-router-dom';

const birthDate = new Date();
    birthDate.setDate(birthDate.getDate() - 10); 
    const birthDate1 = birthDate.toISOString().substring(0, 10);

describe('CreatePet', () => {
  const mockAccessToken = "mockAccessToken";
  const handleOnSubmitMock = jest.fn();
  const updatePetListMock = jest.fn();

  test('creates new pet with valid data', async () => {

    render(
      <MemoryRouter>
        <CreatePet userId={1} accessToken={mockAccessToken} updatePetList={updatePetListMock} />
      </MemoryRouter>
    );

    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 1 }),
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Enter pet type...")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Enter name...")).toBeInTheDocument();
      expect(screen.getByLabelText("Date of Birth")).toBeInTheDocument();
      expect(screen.getByTestId("create-pet-form")).toBeInTheDocument();
    });

    screen.getByTestId("create-pet-form").onsubmit = handleOnSubmitMock;

    fireEvent.change(screen.getByPlaceholderText('Enter pet type...'), { target: { value: "typeTest" } });
    fireEvent.change(screen.getByPlaceholderText('Enter name...'), { target: { value: "nameTest" } });
    fireEvent.change(screen.getByLabelText("Date of Birth"), { target: { value: birthDate1 } });

    fireEvent.click(screen.getByTestId("create-pet-btn"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4000/pets',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${mockAccessToken}`,
          },
          body: JSON.stringify({ name: 'nameTest', petType: 'typeTest', status: 'alive', dob: birthDate1, ownerId: 1 }),
        })
      );
      expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument()
    })

  });

  test('shows error on invalid data', async () => {
    render(
      <MemoryRouter>
        <CreatePet accessToken={mockAccessToken} />
      </MemoryRouter>
    );
  
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Enter pet type...")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Enter name...")).toBeInTheDocument();
      expect(screen.getByLabelText("Date of Birth")).toBeInTheDocument();
      expect(screen.getByTestId("create-pet-btn")).toBeInTheDocument();
    });
  
    fireEvent.change(screen.getByPlaceholderText('Enter pet type...'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Enter name...'), { target: { value: 'nameTest' } });
    fireEvent.change(screen.getByLabelText("Date of Birth"), { target: { value: "2023-12-31" } });
    fireEvent.click(screen.getByTestId("create-pet-btn"));
    await waitFor(() => {
        expect(handleOnSubmitMock).not.toHaveBeenCalled()
        expect(screen.getByTestId("error-msg")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Enter pet type...'), { target: { value: 'typeTest' } });
    fireEvent.change(screen.getByPlaceholderText('Enter name...'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText("Date of Birth"), { target: { value: "2023-12-31" } });
    fireEvent.click(screen.getByTestId("create-pet-btn"));
    await waitFor(() => {
        expect(handleOnSubmitMock).not.toHaveBeenCalled()
        expect(screen.getByTestId("error-msg")).toBeInTheDocument();
    });
  
    // Test for future birth date
    fireEvent.change(screen.getByPlaceholderText('Enter pet type...'), { target: { value: 'typeTest' } });
    fireEvent.change(screen.getByPlaceholderText('Enter name...'), { target: { value: 'nameTest' } });
    fireEvent.change(screen.getByLabelText("Date of Birth"), { target: { value: "2025-12-31" } });
    fireEvent.click(screen.getByTestId("create-pet-btn"));
    await waitFor(() => {
        expect(handleOnSubmitMock).not.toHaveBeenCalled()
        expect(screen.getByTestId("error-msg")).toBeInTheDocument();
    });
  });
});
