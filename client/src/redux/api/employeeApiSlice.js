import { apiSlice } from "./apiSlice";

const EMPLOYEE_URL = 'api/employee';

export const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createEmployee: builder.mutation({
            query: (data) => ({
                url: `${EMPLOYEE_URL}`,
                method: "POST",
                body: data
            })
        }),
        getAllEmplyees: builder.query({
            query: () => ({
                url: EMPLOYEE_URL,
            }),
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `${EMPLOYEE_URL}/${id}`,
                method: "DELETE"
            })
        }),
        getEmployeeDetails: builder.query({
            query: (id) => ({
                url: `${EMPLOYEE_URL}/${id}`
            })
        }),
        updateEmployee: builder.mutation({
            query: (data) => ({
                url: `${EMPLOYEE_URL}/${data.userId}`,
                method:"PUT",
                body: data
            })
        })
    })
})

export const { useCreateEmployeeMutation, useDeleteEmployeeMutation, useGetAllEmplyeesQuery, useGetEmployeeDetailsQuery, useUpdateEmployeeMutation } = employeeApiSlice 
