/**
 * @jest-environment jsdom
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { RQWrapper } from '../components/RQWrapper';
import { CustomError } from '../utils/custom-error';
import { addItemToQueryCache, addItemsToListQueryCache, invalidateQueries } from '../utils/queries';
import { useCreate } from './use-create';

jest.mock('../utils/queries', () => {
  const actual = jest.requireActual('../utils/queries');

  return {
    ...actual,
    addItemToQueryCache: jest.fn(),
    addItemsToListQueryCache: jest.fn(),
    invalidateQueries: jest.fn(),
  };
});

describe('useCreate', () => {
  beforeEach(() => { jest.clearAllMocks(); });

  const apiClientMock = jest.fn();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RQWrapper apiUrl="http://api.example.com" apiClient={apiClientMock}>
      {children}
    </RQWrapper>
  );

  it('should create a new resource and update the cache', async () => {
    apiClientMock.mockResolvedValue({ data: { id: 1, name: 'John Doe' } });

    const { result } = renderHook(() => useCreate({
      resourcePath: 'users/{id}/messages',
    }), { wrapper });

    act(() => {
      result.current.create({
        data: { name: 'John Doe', email: 'john@example.com' },
        resourceParams: { id: '10' },
      });
    });

    await waitFor(() => expect(apiClientMock).toHaveBeenCalledTimes(1));

    expect(apiClientMock).toHaveBeenCalledWith({
      url: 'http://api.example.com/users/10/messages',
      method: 'POST',
      data: { name: 'John Doe', email: 'john@example.com' },
      authorization: '',
      headers: {},
      onError: expect.any(Function),
      onSuccess: expect.any(Function),
    });

    expect(addItemToQueryCache).toHaveBeenCalled();
    expect(addItemsToListQueryCache).toHaveBeenCalled();
    expect(invalidateQueries).toHaveBeenCalled();
  });

  it('should handle errors correctly', async () => {
    apiClientMock.mockRejectedValue(new CustomError('Error creating resource'));

    const { result } = renderHook(() => useCreate({
      resourcePath: 'users/{id}/messages',
    }), { wrapper });

    act(() => {
      result.current.create({
        data: { name: 'John Doe', email: 'john@example.com' },
        resourceParams: { id: '10' },
      });
    });

    await waitFor(() => expect(apiClientMock).toHaveBeenCalledTimes(1));

    expect(apiClientMock).toHaveBeenCalledWith({
      url: 'http://api.example.com/users/10/messages',
      method: 'POST',
      data: { name: 'John Doe', email: 'john@example.com' },
      authorization: '',
      headers: {},
      onError: expect.any(Function),
      onSuccess: expect.any(Function),
    });
  });
});
