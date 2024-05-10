import { apiSlice } from './apiSlice.js';

export const TESTIMONIAL_URL = '/api/testimonials';

export const testimonialApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getTestimonials: builder.query({
         query: () => ({
            url: `${TESTIMONIAL_URL}`,
         })
      }),
      postTestimonials: builder.mutation({
         query: (data) => ({
            url: `${TESTIMONIAL_URL}`,
            method: "POST",
            body: data
         })
      }),
      deleteTestimonials: builder.mutation({
         query: (testId) => ({
            url: `${TESTIMONIAL_URL}/${testId}`,
            method: "DELETE",
         })
      }),
      updateTestimonials: builder.mutation({
         query: ({data, testId}) => ({
            url: `${TESTIMONIAL_URL}/${testId}`,
            method: "PUT",
            body: data
         })
      }),
   })
})
export const { 
   useGetTestimonialsQuery,
   usePostTestimonialsMutation,
   useDeleteTestimonialsMutation,
   useUpdateTestimonialsMutation
} = testimonialApiSlice;