import { apiSlice } from './apiSlice.js';

export const RESERVATION_URL = '/api/reservations';

export const reservationApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getAllReservation: builder.query({
         query: () => ({
            url: `${RESERVATION_URL}`,
         })
      }),
      getMyReservations: builder.query({
         query: () => ({
            url: `${RESERVATION_URL}/my-reservations`,
         })
      }),
      getReservationById: builder.query({
         query: (reservationId) => ({
            url: `${RESERVATION_URL}/${reservationId}`
         })
      }),
      makeReservation: builder.mutation({
         query: (data) => ({
            url: `${RESERVATION_URL}`,
            method: "POST",
            body: data
         })
      }),
      cancelledReservation: builder.mutation({
         query: (reservationId) => ({
            url: `${RESERVATION_URL}/${reservationId}`,
            method: "DELETE"
         })
      }),
      payReservation: builder.mutation({
         query: (reservationId) => ({
            url: `${RESERVATION_URL}/${reservationId}/pay`,
            method: "PUT"
         })
      }),
      getRevenueByDate: builder.query({
         query: () => ({
            url: `${RESERVATION_URL}/revenue-by-date`,
         })
      })
   })
})
export const { 
   useGetAllReservationQuery, 
   useGetMyReservationsQuery, 
   useGetReservationByIdQuery, 
   useMakeReservationMutation, 
   useCancelledReservationMutation, 
   usePayReservationMutation,
   useGetRevenueByDateQuery
} = reservationApiSlice;