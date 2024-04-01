import { apiSlice } from './apiSlice.js';

export const USER_URL = 'api/users';

export const userApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      register: builder.mutation({
         query: (data) => ({
            url: `${USER_URL}/register`,
            method: "POST",
            body: data
         })
      }),
      login: builder.mutation({
         query: (data) => ({
            url: `${USER_URL}/login`,
            method: "POST",
            body: data
         })
      }),
      logout: builder.mutation({
         query: () => ({
            url: `${USER_URL}/logout`,
            method: "POST"
         })
      }),
      getAllUsers: builder.query({
          query: () => ({
              url: USER_URL,
          }),
      }),
      getSpecificUser: builder.query({
         query: (userId) => ({
            url: `${USER_URL}/${userId}`,
         })
      }),
      deleteEmployee: builder.mutation({
         query: (userId) => ({
               url: `${USER_URL}/${userId}`,
               method: "DELETE"
         })
      }),
      getCurrentUserProfile: builder.query({
         query: () => ({
            url: `${USER_URL}/me`
         })
      }),
      updateCurrentUserProfile: builder.mutation({
         query: (data) => ({
            url: `${USER_URL}/me`,
            method: "PUT",
            body: data
         })
      })    
   })
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useGetAllUsersQuery, useGetSpecificUserQuery, useDeleteEmployeeMutation, useGetCurrentUserProfileQuery, useUpdateCurrentUserProfileMutation } = userApiSlice