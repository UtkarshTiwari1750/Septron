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
    setEditSection,
    setAddSection,
    setLoading
} = sectionSlice.actions;

export default sectionSlice.reducer;