import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    addSubSection: false,
    editSubSection: false,
}

const subSectionSlice = createSlice({
    name: "subSection",
    initialState: initialState,
    reducers: {
        setAddSubSection: (state, action) => {
            state.addSubSection = action.payload;
        },
        setEditSubSection: (state, value) => {
            state.editSubSection = value.payload;
        }
    }
})

export const {setAddSubSection, setEditSubSection} = subSectionSlice.actions;
export default subSectionSlice.reducer;