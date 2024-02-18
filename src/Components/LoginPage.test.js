import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
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
        const mockAccessToken = 'mockAccessToken';
        const mockResponse = { access_token: mockAccessToken };

        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
            status: 403
        })

        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(screen.getByText('Login')).toBeInTheDocument()
        })

        const emailInput = screen.getByLabelText('Email Address')
        const passwordInput = screen.getByLabelText('Password')
        const loginButton = screen.getByText('Login')

        fireEvent.change(emailInput, { target: { value: 'wrong@email.com' } })
        fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } })

        fireEvent.click(loginButton)

        await waitFor(() => {
            const errorMessage = screen.queryByTestId("login-error-msg")
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
                }),
                removeItem(key) {
                    delete store[key];
                },
            }
        })()
        Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock })

        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(screen.getByText('Login')).toBeInTheDocument()
        })

        const emailInput = screen.getByLabelText('Email Address');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByText('Login');

        fireEvent.change(emailInput, { target: { value: 'correct@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'correctPassword' } });

        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(sessionStorageMock.setItem).toHaveBeenCalledWith('accessToken', mockAccessToken);
            expect(mockNavigate).toHaveBeenCalledWith('/pets', { state: { accessToken: mockAccessToken } });
        });
    }); 
})