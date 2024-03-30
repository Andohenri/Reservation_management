import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   employees: [],
   totalEmployees: 0,
   minSalary: 0,
   maxSalary: 0,
   totalSalary: 0
}

function updateEmployee(state) {
   const salary = state.employees.map(employee => employee.salary);

   state.totalEmployees = state.employees.length;
   state.minSalary = Math.min(...salary);
   state.maxSalary = Math.max(...salary);
   state.totalSalary = state.employees.reduce((acc, employee) => acc + employee.salary, 0);
   return state;
}

const employeeSlice = createSlice({
   name: 'employee',
   initialState,
   reducers: {
      setEmployees: (state, action) => {
         state.employees = action.payload
         state = updateEmployee(state)
      },
      deleteEmployee: (state, action) => {
         state.employees = state.employees.filter(e => e._id !== action.payload._id)
         state = updateEmployee(state)
      },
      updateEmployee: (state, action) => {
         let findIndex = state.employees.findIndex(employee => employee._id === action.payload._id)
         if(findIndex !== -1){
            state.employees[findIndex] = action.payload;
         }
         state = updateEmployee(state)
      },
      addEmployee: (state, action) => {
         state.employees = [...state.employees, action.payload]
      }
   }
})

export const { setEmployees } = employeeSlice.actions
export default employeeSlice.reducer