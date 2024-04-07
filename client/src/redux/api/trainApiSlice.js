import { apiSlice } from './apiSlice.js';

export const TRAIN_URL = '/api/trains';

export const trainApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getAllTrains: builder.query({
         query: () => ({
            url: TRAIN_URL,
         })
      }),
      getTrain: builder.query({
         query: (trainId) => ({
            url: `${TRAIN_URL}/${trainId}`,
         })
      }),
      createTrain: builder.mutation({
         query: (data) => ({
            url: `${TRAIN_URL}`,
            method: "POST",
            body: data
         })
      }),
      updateTrain: builder.mutation({
         query: ({ data, trainId }) => ({
            url: `${TRAIN_URL}/${trainId}`,
            method: "PUT",
            body: data
         })
      }),
      deleteTrain: builder.mutation({
         query: (trainId) => ({
            url: `${TRAIN_URL}/${trainId}`,
            method: "DELETE"
         })
      }),
      updateTrainAvalaible: builder.mutation({
         query: (trainId) => ({
            url: `${TRAIN_URL}/${trainId}/avalaible`,
            method: "PUT"
         })
      }),
      updateTrainUnavalaible: builder.mutation({
         query: (trainId) => ({
            url: `${TRAIN_URL}/${trainId}/unavalaible`,
            method: "PUT"
         })
      }),
      updateTrainInMaintenance: builder.mutation({
         query: (trainId) => ({
            url: `${TRAIN_URL}/${trainId}/maintenance`,
            method: "PUT"
         })
      })
   })
})
export const { useGetAllTrainsQuery, useGetTrainQuery, useCreateTrainMutation, useUpdateTrainMutation, useDeleteTrainMutation, useUpdateTrainAvalaibleMutation, useUpdateTrainUnavalaibleMutation, useUpdateTrainInMaintenanceMutation } = trainApiSlice;