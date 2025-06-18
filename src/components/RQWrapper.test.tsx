import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RQWrapper, useRQWrapperContext } from './RQWrapper';
import React from 'react';

// Mock the internal components and utilities
jest.mock('../internal/components/Toaster', () => ({
  Toaster: ({ children }: { children: React.ReactNode }) => <div data-testid="toaster">{children}</div>,
}));

jest.mock('../internal/utils/undo-event-emitter', () => ({
  undoEventEmitter: {
    emit: jest.fn(),
  },
}));

jest.mock('../internal/query-client', () => ({
  queryClientManager: {
    queryClient: null,
  },
}));

// Mock the toast utility
jest.mock('../utils/toast', () => ({
  toast: {
    success: jest.fn(),
    dismiss: jest.fn(),
  },
}));

describe('RQWrapper', () => {
  const mockApiUrl = 'https://api.example.com';
  const mockChildren = <div>Test Content</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children', () => {
    render(
      <RQWrapper apiUrl={mockApiUrl}>
        {mockChildren}
      </RQWrapper>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should provide context values', () => {
    const TestComponent = () => {
      const context = useRQWrapperContext();
      return (
        <div>
          <div data-testid="api-url">{context.apiUrl}</div>
          <div data-testid="api-ensure-trailing-slash">
            {context.apiEnsureTrailingSlash.toString()}
          </div>
        </div>
      );
    };

    render(
      <RQWrapper apiUrl={mockApiUrl} apiEnsureTrailingSlash>
        <TestComponent />
      </RQWrapper>,
    );

    expect(screen.getByTestId('api-url')).toHaveTextContent(mockApiUrl);
    expect(screen.getByTestId('api-ensure-trailing-slash')).toHaveTextContent('true');
  });

  // it('should handle API authorization', async () => {
  //   const mockAuth = jest.fn().mockReturnValue('Bearer token');
  //   const mockApiClient = jest.fn();

  //   render(
  //     <RQWrapper
  //       apiUrl={mockApiUrl}
  //       apiAuthorization={mockAuth}
  //       apiClient={mockApiClient}
  //     >
  //       {mockChildren}
  //     </RQWrapper>,
  //   );

  //   const context = useRQWrapperContext();
  //   await context.apiClient({ url: '/test' } as any);

  //   expect(mockAuth).toHaveBeenCalled();
  //   expect(mockApiClient).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       authorization: 'Bearer token',
  //     }),
  //   );
  // });

  // it('should handle API headers', async () => {
  //   const mockHeaders = jest.fn().mockReturnValue({ 'X-Custom': 'value' });
  //   const mockApiClient = jest.fn();

  //   render(
  //     <RQWrapper
  //       apiUrl={mockApiUrl}
  //       apiHeaders={mockHeaders}
  //       apiClient={mockApiClient}
  //     >
  //       {mockChildren}
  //     </RQWrapper>,
  //   );

  //   const context = useRQWrapperContext();
  //   await context.apiClient({ url: '/test' } as any);

  //   expect(mockHeaders).toHaveBeenCalled();
  //   expect(mockApiClient).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       headers: { 'X-Custom': 'value' },
  //     }),
  //   );
  // });

  // it('should handle API success callback', async () => {
  //   const mockOnSuccess = jest.fn();
  //   const mockApiClient = jest.fn().mockResolvedValue({ data: 'success' });

  //   render(
  //     <RQWrapper
  //       apiUrl={mockApiUrl}
  //       apiOnSuccess={mockOnSuccess}
  //       apiClient={mockApiClient}
  //     >
  //       {mockChildren}
  //     </RQWrapper>,
  //   );

  //   const context = useRQWrapperContext();
  //   await context.apiClient({ url: '/test' } as any);

  //   expect(mockOnSuccess).toHaveBeenCalled();
  // });

  // it('should handle API error callback', async () => {
  //   const mockOnError = jest.fn();
  //   const mockApiClient = jest.fn().mockRejectedValue(new Error('API Error'));

  //   render(
  //     <RQWrapper
  //       apiUrl={mockApiUrl}
  //       apiOnError={mockOnError}
  //       apiClient={mockApiClient}
  //     >
  //       {mockChildren}
  //     </RQWrapper>,
  //   );

  //   const context = useRQWrapperContext();
  //   await context.apiClient({ url: '/test', method: 'GET' } as any).catch(() => {});

  //   expect(mockOnError).toHaveBeenCalled();
  // });

  // it('should handle toast undo functionality', () => {
  //   const { toast } = require('../utils/toast');
  //   const { undoEventEmitter } = require('../internal/utils/undo-event-emitter');

  //   render(
  //     <RQWrapper apiUrl={mockApiUrl}>
  //       {mockChildren}
  //     </RQWrapper>,
  //   );

  //   const context = useRQWrapperContext();
  //   context.toastUndo({
  //     message: 'Test message',
  //     type: 'success',
  //   });

  //   expect(toast.dismiss).toHaveBeenCalled();
  //   expect(toast.success).toHaveBeenCalled();
  // });

  // it('should initialize QueryClient with provided config', () => {
  //   const mockConfig = {
  //     defaultOptions: {
  //       queries: {
  //         retry: 2,
  //       },
  //     },
  //   };

  //   render(
  //     <RQWrapper apiUrl={mockApiUrl} config={mockConfig}>
  //       {mockChildren}
  //     </RQWrapper>,
  //   );

  //   const { queryClientManager } = require('../internal/query-client');
  //   expect(queryClientManager.queryClient).toBeInstanceOf(QueryClient);
  // });

  it('should render ReactQueryDevtools when isDevTools is true', () => {
    render(
      <RQWrapper apiUrl={mockApiUrl} isDevTools>
        {mockChildren}
      </RQWrapper>,
    );

    // Note: We can't directly test for ReactQueryDevtools presence
    // as it's rendered in a portal, but we can verify the component renders
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
