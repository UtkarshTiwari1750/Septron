import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    addSubSection: false,
    editSubSection: null,
}

const subSectionSlice = createSlice({
    name: "subSection",
    initialState: initialState,
    reducers: {
        setAddSubSection: (state, value) => {
            state.addSubSection = value.payload;
        },
        setEditSubSection: (state, value) => {
            state.editSubSection = value.payload;
        }
    }
})

export const {setAddSubSection, setEditSubSection} = subSectionSlice.actions;
export default subSectionSlice.reducer;