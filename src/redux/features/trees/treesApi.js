import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const treesApi = createApi({
  reducerPath: 'treesApi',
  baseQuery,
  tagTypes: ['Trees'],
  endpoints: (builder) => ({
    fetchAllTrees: builder.query({
      query: () => '/api/trees',
      providesTags: ['Trees']
    }),

    fetchTreeById: builder.query({
      query: (id) => `/api/trees/${id}`,
      providesTags: (result, error, id) => [{ type: 'Trees', id }]
    }),

    addTree: builder.mutation({
      query: (newTree) => ({
        url: '/api/trees/create-tree',
        method: 'POST',
        body: newTree
      }),
      invalidatesTags: ['Trees']
    }),

    updateTree: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/api/trees/edit/${id}`,
        method: 'PUT',
        body: rest,
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      invalidatesTags: ['Trees']
    }),

    deleteTree: builder.mutation({
      query: (id) => ({
        url: `/api/trees/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Trees']
    })
  })
});

export const {
  useFetchAllTreesQuery,
  useFetchTreeByIdQuery,
  useAddTreeMutation,
  useUpdateTreeMutation,
  useDeleteTreeMutation
} = treesApi;

export default treesApi;