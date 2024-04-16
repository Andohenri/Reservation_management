import { apiSlice } from './apiSlice.js';

export const NOTIFICATION_URL = '/api/notifications';

export const notificationApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getMyNotifications: builder.query({
         query: ({pageSize, pageNumber}) => ({
            url: `${NOTIFICATION_URL}/my-notifications?pageSize=${pageSize}&pageNumber=${pageNumber}`,
         })
      }),
      deleteAllMyNotifications: builder.mutation({
         query: () => ({
            url: `${NOTIFICATION_URL}/my-notifications`,
            method: "DELETE"
         })
      }),
      sendNotification: builder.mutation({
         query: (data) => ({
            url: `${NOTIFICATION_URL}`,
            method: "POST",
            body: data
         })
      }),
      deleteNotification: builder.mutation({
         query: (notifId) => ({
            url: `${NOTIFICATION_URL}/${notifId}`,
            method: "DELETE"
         })
      }),
   })
})
export const { 
   useDeleteAllMyNotificationsMutation, 
   useGetMyNotificationsQuery, 
   useSendNotificationMutation, 
   useDeleteNotificationMutation,
} = notificationApiSlice;