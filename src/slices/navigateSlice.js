import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: "Home",
}

const navSlice = createSlice({
    name: "nav",
    initialState: initialState,
    reducers: {
        setCurrentPage: (state, value) => {
            state.currentPage = value.payload;
        }
    }
})

export const {setCurrentPage} = navSlice.actions;
export default navSlice.reducer; 
