import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    contentEntrieData: [],
    contentSectionData: [],
    completeVideos: [],
    totalNoOfVideos: 0,
}

const viewContentSlice = createSlice({
    name:"viewContent",
    initialState: initialState,
    reducers: {
        setEntireContentData: (state, value) => {
            state.contentEntrieData = value.payload;
        },
        setContentSectionData: (state, value) => {
            state.contentSectionData = value.payload;
        },
        setCompletedVideos: (state, value) => {
            state.completeVideos = value.payload;
        },
        setTotalNoOfVideos: (state, value) => {
            state.totalNoOfVideos = value.payload;
        },
        updateCompletedVideos: (state, value) => {
            state.completeVideos = [...state.completeVideos, value.payload];
        }
    }
})

export const {
    setEntireContentData,
    setContentSectionData,
    setCompletedVideos,
    setTotalNoOfVideos,
    updateCompletedVideos,
} = viewContentSlice.actions;

export default viewContentSlice.reducer;