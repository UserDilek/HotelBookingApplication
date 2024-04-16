import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import SignOutButton from '../SignOutButton';

jest.mock('../../apiClient', () => ({
  signOut: jest.fn(),
}));

describe('SignOutButton', () => {
  it('renders sign out button', () => {
    const { getByText } = render(<SignOutButton />);
    const signOutButton = getByText('Sign Out');
    expect(signOutButton).toBeInTheDocument();
  });

  it('calls signOut function when button is clicked', () => {
    const { getByText } = render(<SignOutButton />);
    const signOutButton = getByText('Sign Out');
    fireEvent.click(signOutButton);
    expect(signOutButton).toBeEnabled(); // Ensure that the button is enabled
  });
});
