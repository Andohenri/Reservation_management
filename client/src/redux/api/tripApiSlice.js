import { apiSlice } from './apiSlice.js';

export const TRIP_URL = '/api/trips';

export const tripApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getTrips: builder.query({
         query: ({ departure_date, origin, destination }) => ({
            url: `${TRIP_URL}?departure_date=${departure_date}&origin=${origin}&destination=${destination}`,
         })
      }),
      getAllTrips: builder.query({
         query: () => ({
            url: `${TRIP_URL}/all-trips`,
         })
      }),
      getTrip: builder.query({
         query: (tripId) => ({
            url: `${TRIP_URL}/${tripId}`,
         })
      }),
      createTrip: builder.mutation({
         query: (data) => ({
            url: `${TRIP_URL}`,
            method: "POST",
            body: data
         })
      }),
      updateTrip: builder.mutation({
         query: ({ data, tripId }) => ({
            url: `${TRIP_URL}/${tripId}`,
            method: "PUT",
            body: data
         })
      }),
      deleteTrip: builder.mutation({
         query: (tripId) => ({
            url: `${TRIP_URL}/${tripId}`,
            method: "DELETE"
         })
      }),
      updateTripInProgress: builder.mutation({
         query: (tripId) => ({
            url: `${TRIP_URL}/${tripId}/in-progress`,
            method: "PUT"
         })
      }),
      updateTripCancelled: builder.mutation({
         query: (tripId) => ({
            url: `${TRIP_URL}/${tripId}/cancelled`,
            method: "PUT"
         })
      }),
      updateTripCompleted: builder.mutation({
         query: (tripId) => ({
            url: `${TRIP_URL}/${tripId}/completed`,
            method: "PUT"
         })
      })
   })
})
export const { useGetTripsQuery, useGetAllTripsQuery, useGetTripQuery, useCreateTripMutation, useUpdateTripMutation, useDeleteTripMutation, useUpdateTripCancelledMutation, useUpdateTripCompletedMutation, useUpdateTripInProgressMutation } = tripApiSlice;