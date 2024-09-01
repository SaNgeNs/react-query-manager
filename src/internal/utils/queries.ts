import { QueryClient } from '@tanstack/react-query';

export const invalidateQueryCacheKeys = ({
  queryClient,
  queryKeys,
}: {
  queryClient: QueryClient,
  queryKeys: any[],
}) => {
  queryKeys.forEach((queryKey) => {
    queryClient.invalidateQueries({ queryKey });
  });
};

export const setQueryCacheData = ({
  queryClient,
  queryKeys,
  data,
}: {
  queryClient: QueryClient;
  queryKeys: any[];
  data: any;
}) => {
  queryKeys.forEach((queryKey) => {
    queryClient.setQueryData(queryKey, data);
  });
};
