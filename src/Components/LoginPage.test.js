import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))

describe("login", () => {
    test("show error message on wrong input", async () => {
        const { getByLabelText, getByText } = render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        )

        const emailInput = getByLabelText('Email Address')
        const passwordInput = getByLabelText('Password')
        const loginButton = getByText('Login')

        fireEvent.change(emailInput, { target: { value: 'wrong@email.com' } })
        fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } })

        fireEvent.click(loginButton)

        await waitFor(() => {
            const errorMessage = getByText('Wrong email or password.')
            expect(errorMessage).toBeInTheDocument()
        })
    })

    test("successful login", async () => {
        const mockAccessToken = 'mockAccessToken';
        const mockResponse = { access_token: mockAccessToken };

        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
            status: 200
        })

        // Mock sessionStorage.setItem
        const sessionStorageMock = (() => {
            let store = {}
            return {
                setItem: jest.fn((key, value) => {
                    store[key] = value.toString();
                })
            }
        })()
        Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock })

        const { getByLabelText, getByText } = render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        )

        const emailInput = getByLabelText('Email Address');
        const passwordInput = getByLabelText('Password');
        const loginButton = getByText('Login');

        fireEvent.change(emailInput, { target: { value: 'correct@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'correctPassword' } });

        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(sessionStorageMock.setItem).toHaveBeenCalledWith('accessToken', mockAccessToken);
            expect(mockNavigate).toHaveBeenCalledWith('/pets', { state: { accessToken: mockAccessToken } });
        });
    }); 
})