import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    sectionNames: null,
    sectionDescription: null,
    sectionImage: null,
    editSection: false,
}

const sectionSlice = createSlice({
    name: "section",
    initialState: initialState,
    reducers: {
        setSectionNames: (state, value) => {
            state.sectionNames = value.payload;
        },
        setSectionDescription: (state, value) => {
            state.sectionDescription = value.payload;
        },
        setSectionImage: (state, value) => {
            state.sectionImage = value.payload;
        },
        setEditSection: (state, value) => {
            state.editSection = value.payload;
        }
    }
});

export const {
    setSectionNames, 
    setSectionDescription, 
    setSectionImage, 
    setEditSection
} = sectionSlice.actions;

export default sectionSlice.reducer;