import { apiSlice } from './apiSlice.js';

export const USER_URL = '/api/users';
export const UPLOAD_URL = '/api/uploads';

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
      deleteUser: builder.mutation({
         query: (userId) => ({
               url: `${USER_URL}/${userId}`,
               method: "DELETE"
         })
      }),
      updateUser: builder.mutation({
         query: (data) => ({
               url: `${USER_URL}/${data.userId}`,
               method: "PUT"
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
      }),
      uploadImage: builder.mutation({
         query: (data) => ({
            url: `${UPLOAD_URL}`,
            method: "POST",
            body: data
         })
      }),
   })
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useGetAllUsersQuery, useUploadImageMutation, useGetSpecificUserQuery, useDeleteUserMutation, useUpdateUserMutation, useGetCurrentUserProfileQuery, useUpdateCurrentUserProfileMutation } = userApiSlice