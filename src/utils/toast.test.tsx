import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { toast, ToastBar, resolveToastValue } from './toast';

// Mock react-hot-toast
jest.mock('react-hot-toast/headless', () => {
  const mockToast = {
    success: jest.fn(),
    error: jest.fn(),
    dismiss: jest.fn(),
    custom: jest.fn(),
  };
  return {
    __esModule: true,
    default: mockToast,
    remove: jest.fn(),
  };
});

describe('toast utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should export toast functions', () => {
    expect(toast.success).toBeDefined();
    expect(toast.error).toBeDefined();
    expect(toast.dismiss).toBeDefined();
    expect(toast.custom).toBeDefined();
  });

  it('should render ToastBar component', () => {
    const mockToast = {
      id: '1',
      type: 'success',
      message: 'Test message',
      visible: true,
    };

    render(
      <ToastBar
        toast={mockToast as any}
        position="top-right"
      />,
    );

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('should resolve toast value from string', () => {
    const result = resolveToastValue('Test message', {});
    expect(result).toBe('Test message');
  });

  it('should resolve toast value from function', () => {
    const result = resolveToastValue((ctx) => `Hello ${ctx.name}`, { name: 'World' });
    expect(result).toBe('Hello World');
  });

  it('should handle custom toast content', () => {
    const CustomContent = ({ message }: { message: string }) => (
      <div data-testid="custom-content">{message}</div>
    );

    const mockToast = {
      id: '1',
      type: 'success',
      message: 'Test message',
      visible: true,
    };

    render(
      <ToastBar
        toast={mockToast as any}
        children={({ message }) => <CustomContent message={message as any} />}
      />,
    );

    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });
});
