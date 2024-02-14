import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    images: null,
    videos: null,
    editGallery: false
}

const gallerySlice = createSlice({
    name:"gallery",
    initialState: initialState,
    reducers: {
        setImages: (state, value) => {
            state.images = value.payload;
        },
        setVideos: (state, value) => {
            state.videos = value.payload;
        },
        setEditGallery: (state, value) => {
            state.editGallery = value.payload;
        }
    }
});

export const { setImages, setVideos } = gallerySlice.actions;
export default gallerySlice.reducer;