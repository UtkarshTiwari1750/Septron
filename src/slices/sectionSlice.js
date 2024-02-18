import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    sectionNames: null,
    sectionDescription: null,
    sectionImage: null,
    editSection: null,
    addSection: null,
    loading: false,
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
        },
        setAddSection: (state, value) => {
            state.addSection = value.payload;
        },
        setLoading: (state, value) => {
            state.loading = value.payload;
        }
    }
});

export const {
    setSectionNames, 
    setSectionDescription, 
    setSectionImage, 
    setEditSection,
    setAddSection,
    setLoading
} = sectionSlice.actions;

export default sectionSlice.reducer;