import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    step: 1,
    content: null,
    paymentLoading: false,
    editContent: false,
    loading: false,
    allContentAndAnime: localStorage.getItem("allContentAndAnime") 
    ? JSON.parse(localStorage.getItem("allContentAndAnime")) 
    : {
        "artistContent": "",
        "popularAnimes": "",
        "trendingAnimes": ""
    },
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
        setLoading: (state, value) => {
            state.loading = value.payload;
        },
        setAllContentAndAnime: (state, value) => {
            state.allContentAndAnime = value.payload;
        }
    },
})

export const {
    setStep, 
    setPaymentLoading, 
    setEditContent,
    setContent,
    resetContentState,
    setLoading,
    setAllContentAndAnime
} = contentSlice.actions;

export default contentSlice.reducer;