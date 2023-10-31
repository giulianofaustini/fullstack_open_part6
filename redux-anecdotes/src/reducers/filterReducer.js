import { createSlice } from '@reduxjs/toolkit'


const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      console.log(JSON.parse(JSON.stringify(state))) 
     return action.payload 
    }
  }
})



export const { setFilter } = filterSlice.actions

export default filterSlice.reducer;








// const filterReducer = (state = "", action) => {
//   switch (action.type) {
//     case "SET_FILTER":
//       return action.filter;
//     default:
//       return state;
//   }
// };



// export const setFilter = (filter) => {
//     return {
//         type: 'SET_FILTER',
//         filter
//     }
// }

// export default filterReducer