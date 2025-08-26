import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const baseQuery= fetchBaseQuery({
    baseUrl:`${getBaseUrl()}/api/trees`,
    credentials:"include",
    prepareHeaders:(Headers)=>{
       const token =  localStorage.getItem('token');
        if(token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
        } 
    })

const treesApi= createApi({
    reducerPath: "treesApi",
    baseQuery,
    tagTypes: ['Trees'],
    endpoints: (builder) =>({
        fetchAllTrees: builder.query({
            query: () => "/",
            providesTags: ["Trees"]
      }),
fetchTreeById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Trees", id }],
        }),
        addTree: builder.mutation({
            query: (newTree) => ({
                url: `/create-tree`,
                method: "POST",
                body: newTree
            }),
            invalidatesTags: ["Trees"]
        }),
        updateTree: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Trees"]
        }),
        deleteTree: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Trees"]
        })   
     })
})

export const {useFetchAllTreesQuery,useFetchTreeByIdQuery,useAddTreeMutation,useUpdateTreeMutation,useDeleteTreeMutation }= treesApi;
export default treesApi;