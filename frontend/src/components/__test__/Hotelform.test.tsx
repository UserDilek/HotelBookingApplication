import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Make sure to import extend-expect
import HotelForm from '../HotelForm'; // Update the import path as per your directory structure

describe('HotelForm Component', () => {
  test('renders all input fields correctly', () => {
    render(<HotelForm label="Add Hotel" handleFormSubmit={() => {}} />);
    
    // Test if input fields are rendered
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
    expect(screen.getByLabelText('Rating')).toBeInTheDocument();
    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Facilities')).toBeInTheDocument();
    expect(screen.getByLabelText('Adults')).toBeInTheDocument();
    expect(screen.getByLabelText('Child')).toBeInTheDocument();
    expect(screen.getByLabelText('Images')).toBeInTheDocument();
  });

  test('allows user to input data', () => {
    render(<HotelForm label="Add Hotel" handleFormSubmit={() => {}} />);
    
    // Simulate user input
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Hotel' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Test City' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText('Price'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Rating'), { target: { value: '4' } });

    // Check if input values are updated
    expect(screen.getByLabelText('Name')).toHaveValue('Test Hotel');
    expect(screen.getByLabelText('City')).toHaveValue('Test City');
    expect(screen.getByLabelText('Description')).toHaveValue('Test Description');
    expect(screen.getByLabelText('Price')).toHaveValue('100');
    expect(screen.getByLabelText('Rating')).toHaveValue('4');
  });

  // Add more test cases as needed
});
