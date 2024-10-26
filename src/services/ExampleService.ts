import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import { apiGet } from 'configs/BaseService';
import { PaginatedResponse } from 'types/ExampleTypes';

const fetchRandomUser = async (page: number, limit: number): Promise<PaginatedResponse> => {
  return await apiGet<PaginatedResponse>(`/public/randomusers?page=${page}&limit=${limit}`);
};

export const useGetRandomUser = (page: number = 1, limit: number = 10, options?: QueryObserverOptions<PaginatedResponse>) => {
  return useQuery<PaginatedResponse>({
    queryKey: ['random-users', page, limit],
    queryFn: () => fetchRandomUser(page, limit),
    placeholderData: (prev) => prev,
    //staleTime: 1000 * 60 * 5,
    ...options
  })
};
