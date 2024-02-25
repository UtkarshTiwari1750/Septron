import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import contentReducer from "../slices/contentSlice";
import galleryReducer from "../slices/gallerySlice";
import sectionReducer from "../slices/sectionSlice";
import subSectionReducer from "../slices/subSectionSlice";
import commentReducer from "../slices/commentSlice";
import navReducer from "../slices/navigateSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    content: contentReducer,
    gallery: galleryReducer,
    section: sectionReducer, 
    subSection: subSectionReducer,
    comment: commentReducer,
    nav: navReducer
});

export default rootReducer;

