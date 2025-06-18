import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Toaster } from './Toaster';
import type { Toast } from 'react-hot-toast';

// Mock react-hot-toast's useToaster hook
const mockUseToaster = jest.fn();
jest.mock('react-hot-toast/headless', () => ({
  useToaster: () => mockUseToaster(),
  resolveValue: (message: string) => message,
}));

describe('Toaster', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseToaster.mockReturnValue({
      toasts: [
        {
          id: '1',
          message: 'Test toast',
          type: 'default',
          visible: true,
          position: 'top-center',
        },
      ],
      handlers: {
        startPause: jest.fn(),
        endPause: jest.fn(),
        calculateOffset: jest.fn(() => 0),
        updateHeight: jest.fn(),
      },
    });
  });

  it('renders with default props', () => {
    render(<Toaster />);
    const toaster = screen.getByTestId('toast-wrapper');
    expect(toaster).toBeInTheDocument();
  });

  // it('renders with custom position', () => {
  //   render(<Toaster position="bottom-right" />);
  //   const toaster = screen.getByTestId('toast-wrapper');
  //   expect(toaster).toHaveStyle({
  //     position: 'absolute',
  //     bottom: 0,
  //     justifyContent: 'flex-end',
  //   });
  // });

  it('renders with custom container style', () => {
    const customStyle = { backgroundColor: 'red' };
    render(<Toaster containerStyle={customStyle} />);
    const toaster = screen.getByTestId('toast-wrapper');
    expect(toaster.parentElement).toHaveStyle({
      backgroundColor: 'red',
    });
  });

  it('renders with custom container className', () => {
    render(<Toaster containerClassName="custom-class" />);
    const toaster = screen.getByTestId('toast-wrapper');
    expect(toaster.parentElement).toHaveClass('custom-class');
  });

  // it('handles mouse enter and leave events', () => {
  //   const mockHandlers = {
  //     startPause: jest.fn(),
  //     endPause: jest.fn(),
  //     calculateOffset: jest.fn(() => 0),
  //     updateHeight: jest.fn(),
  //   };

  //   mockUseToaster.mockReturnValue({
  //     toasts: [],
  //     handlers: mockHandlers,
  //   });

  //   render(<Toaster />);
  //   const toaster = screen.getByTestId('toast-wrapper').parentElement;

  //   fireEvent.mouseEnter(toaster!);
  //   expect(mockHandlers.startPause).toHaveBeenCalled();

  //   fireEvent.mouseLeave(toaster!);
  //   expect(mockHandlers.endPause).toHaveBeenCalled();
  // });

  it('renders custom toast component when provided', () => {
    const CustomToast = (toast: Toast) => (
      <div data-testid="custom-toast">{String(toast.message)}</div>
    );

    render(<Toaster>{CustomToast}</Toaster>);
    expect(screen.getByTestId('custom-toast')).toBeInTheDocument();
  });

  it('renders toast with correct position style', () => {
    mockUseToaster.mockReturnValue({
      toasts: [
        {
          id: '1',
          message: 'Test toast',
          type: 'default',
          visible: true,
          position: 'bottom-right',
        },
      ],
      handlers: {
        startPause: jest.fn(),
        endPause: jest.fn(),
        calculateOffset: jest.fn(() => 0),
        updateHeight: jest.fn(),
      },
    });

    render(<Toaster />);
    const toastWrapper = screen.getByTestId('toast-wrapper');
    expect(toastWrapper).toHaveStyle({
      position: 'absolute',
      bottom: 0,
      justifyContent: 'flex-end',
    });
  });
});
