import { render, screen } from '@testing-library/react';
import Header from '../Header';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext'; // Import the useAppContext function
import { ReactNode } from 'react'; // Import React and ReactNode types

// Define the custom render function with explicit type for the component parameter
const renderWithProvider = (component: ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

// Mock the useAppContext function
jest.mock('../../contexts/AppContext', () => ({
  useAppContext: jest.fn()
}));

describe('Header component', () => {
  test('renders "My Bookings", "My Hotels", and "Sign Out" links when user is logged in', () => {
    // Mock the return value of useAppContext
    (useAppContext as jest.Mock).mockReturnValue({ isLogged: true });

    renderWithProvider(<Header />); // Pass Header component to renderWithProvider

    expect(screen.getByText('My Bookings')).toBeInTheDocument();
    expect(screen.getByText('My Hotels')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  test('renders "Sign In" link when user is not logged in', () => {
    // Mock the return value of useAppContext
    (useAppContext as jest.Mock).mockReturnValue({ isLogged: false });

    renderWithProvider(<Header />); // Pass Header component to renderWithProvider

    expect(screen.getByText('SignIn')).toBeInTheDocument();
  });
});
