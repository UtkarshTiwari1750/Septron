import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    step: 2,
    content: null,
    paymentLoading: false,
    editContent: false,
}

const contentSlice = createSlice({
    name: "content",
    initialState: initialState,
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload;
        },
        setPaymentLoading: (state, action) => {
            state.paymentLoading = action.payload;
        },
        setEditContent: (state, action) => {
            state.editContent = action.payload;
        },
        setContent: (state, action) => {
            state.content = action.payload;
        },
        resetContentState: (state) => {
            state.step = 1;
            state.content = null;
            state.editContent = false;
        },
    },
})

export const {
    setStep, 
    setPaymentLoading, 
    setEditContent,
    setContent,
    resetContentState,
} = contentSlice.actions;

export default contentSlice.reducer;