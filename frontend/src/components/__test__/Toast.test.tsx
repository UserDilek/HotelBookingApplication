import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import Toast from '../Toast';

describe('Toast component', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Mocking timers
  });

  afterEach(() => {
    jest.runOnlyPendingTimers(); // Ensure that all pending timers are executed
    jest.useRealTimers(); // Restore real timers
  });

  test('renders correctly with success type', () => {
    render(<Toast message="Success message" type="SUCCESS" onClose={() => {}} />);
    const toastElement = screen.getByText('Success message');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveClass('bg-green-600');
  });

  test('renders correctly with error type', () => {
    render(<Toast message="Error message" type="ERROR" onClose={() => {}} />);
    const toastElement = screen.getByText('Error message');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveClass('bg-red-600');
  });

  test('closes after 2 seconds', () => {
    const handleClose = jest.fn();
    render(<Toast message="Test message" type="SUCCESS" onClose={handleClose} />);
    
    // Advance timers by 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('clears timeout on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    const handleClose = jest.fn();
    const { unmount } = render(<Toast message="Test message" type="SUCCESS" onClose={handleClose} />);
    
    // Unmount the component
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when clicked', () => {
    const handleClose = jest.fn();
    render(<Toast message="Test message" type="SUCCESS" onClose={handleClose} />);
    const toastElement = screen.getByText('Test message');
    userEvent.click(toastElement);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
