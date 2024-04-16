import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';
import '@testing-library/jest-dom'
jest.mock('react-datepicker/dist/react-datepicker.css', () => jest.fn());

describe('SearchBar Component', () => {
  test('renders all input fields correctly', () => {
    render(<SearchBar />);
    
    // Test if input fields are rendered
    expect(screen.getByPlaceholderText('Where are you going?')).toBeInTheDocument();
    expect(screen.getByLabelText('Adults:')).toBeInTheDocument();
    expect(screen.getByLabelText('Children:')).toBeInTheDocument();
  });

  test('renders date pickers correctly', () => {
    render(<SearchBar />);
    
    // Test if date pickers are rendered
    expect(screen.getByPlaceholderText('Check-In Date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Check-out Date')).toBeInTheDocument();
  });

  test('renders search and clear buttons correctly', () => {
    render(<SearchBar />);
    
    // Test if search and clear buttons are rendered
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  test('allows user input in input fields', () => {
    render(<SearchBar />);
    
    // Simulate user input in input fields
    fireEvent.change(screen.getByPlaceholderText('Where are you going?'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Adults:'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('Children:'), { target: { value: '1' } });

    // Check if input values are updated
    expect(screen.getByPlaceholderText('Where are you going?')).toHaveValue('New York');
  });

  
});
