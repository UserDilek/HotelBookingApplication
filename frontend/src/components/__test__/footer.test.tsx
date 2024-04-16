import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Footer from '../Footer'; // Update the import path as per your directory structure

describe('Footer Component', () => {
  test('renders all the links correctly', () => {
    render(<Footer />);
    
    // Test if "About Us" and "Help Center" are rendered
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Help Center')).toBeInTheDocument();
    
    // Test if "Careers" and "Complains" are rendered
    expect(screen.getByText('Careers')).toBeInTheDocument();
    expect(screen.getByText('Complains')).toBeInTheDocument();
  });

  test('renders social media icons', () => {
    render(<Footer />);
    
    // Test if social media icons are rendered
    expect(screen.getByTestId('facebook-icon')).toBeInTheDocument();
    expect(screen.getByTestId('instagram-icon')).toBeInTheDocument();
    expect(screen.getByTestId('twitter-icon')).toBeInTheDocument();
    expect(screen.getByTestId('youtube-icon')).toBeInTheDocument();
  });

  test('renders copyright text', () => {
    render(<Footer />);
    
    // Test if copyright text is rendered
    expect(screen.getByText('© 2024 Hotel booking All rights reserved.')).toBeInTheDocument();
  });
});