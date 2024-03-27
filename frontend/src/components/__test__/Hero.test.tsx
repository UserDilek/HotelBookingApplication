import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Make sure to import extend-expect
import Hero from '../Hero'; // Update the import path as per your directory structure

describe('Hero Component', () => {
  test('renders heading and description correctly', () => {
    render(<Hero />);
    
    // Test if heading and description are rendered
    expect(screen.getByText('Find Your Next Stay.')).toBeInTheDocument();
    expect(screen.getByText('Search low prices on hotels, and much more.')).toBeInTheDocument();
  });
});
