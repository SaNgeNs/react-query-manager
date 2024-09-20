import { QueryClient } from '@tanstack/react-query';

export const queryClientManager: {
  queryClient: QueryClient;
} = {
  queryClient: {} as QueryClient,
};

export const getQueryClient = () => {
  return queryClientManager.queryClient;
};
