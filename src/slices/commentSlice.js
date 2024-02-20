import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
}

const commentSlice = createSlice({
    name: 'comment',
    initialState: initialState,
    reducers: {
        setComments(state, value) {
            state.comments = [...state.comments, value.payload];
        }
    }
})

export const { setComments } = commentSlice.actions;
export default commentSlice.reducer;