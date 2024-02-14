import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import contentReducer from "../slices/contentSlice";
import galleryReducer from "../slices/gallerySlice";
const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    content: contentReducer,
    gallery: galleryReducer,
});

export default rootReducer;

