import { contentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";

const {
    GET_ALL_CONTENT_NAME,
    GET_ALL_GENRE,
    CREATE_CONTENT,
    CREATE_SECTION,
    CREATE_SUBSECTION,
    DELETE_CONTENT, 
    DELETE_SECTION,
    DELETE_SUBSECTION,
    EDIT_CONTENT, 
    EDIT_SECTION,
    EDIT_SUBSECTION,
    GET_ALL_CONTENT, 
    GET_CONTENT_DETAILS,
    GET_ARTIST_CONTENT,
    CREATE_GALLERY,
    UPDATE_GALLERY,
    DELETE_GALLERY
} = contentEndpoints

// Get All Content Name
export const getAllContentName = async() => {
    let result = [];
    try{
        const response = await apiConnector("GET", GET_ALL_CONTENT_NAME);

        console.log("GET ALL CONTENT NAME REPONSE...", response);
        if(!response.data.success) {
            throw new Error("Could not fetch content names");
        }

        sessionStorage.setItem("contentNames", JSON.stringify(response.data.data));
        result = response?.data?.data;
    } catch(error) {
        console.log("GET ALL CONTENT NAME ERROR....", error);
    }
    return result;
}

// Get All Genre 
export const getAllGenre = async() => {
    let result = [];
    try{
        const response = await apiConnector("GET", GET_ALL_GENRE);
        console.log("GET ALL GENRE NAME REPONSE...", response);

        if(!response.data.success) {
            throw new Error ("Could not fetch Genre's");
        }

        sessionStorage.setItem("genreNames", JSON.stringify(response.data.data));
        result = response?.data?.data;
    } catch(error) {
        console.log("GET ALL GENRE NAME ERROR....", error);
    }
    return result;
}

// Create Content
export const createContent = async(data, token) => {
    let result = null;
    try{
        const response = await apiConnector("POST",CREATE_CONTENT, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        console.log("CREATE CONTENT REPONSE...", response)
        if(!response.data.success) {
            throw new Error ("Could not Create Content");
        }

        toast.success("Content Created API Successfully");
        result = response?.data?.data;
    } catch(error){
        console.log("CREATE CONTENT API ERROR....", error);
    }
    return result;
}

// CREATE SECTION
export const createSection = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST",CREATE_SECTION, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        console.log("CREATE SECTION API REPONSE...", response)
        if(!response.data.success) {
            throw new Error ("Could not Create Section");
        }

        toast.success("Section Created Successfully");
        result = response?.data?.data;
    } catch(error){
        console.log("CREATE SECTION API ERROR....", error);
    }
    toast.dismiss(toastId);
    return result;
}

// CREATE SUBSECTION
export const createSubSection = async(data, token) => {
    let result = null;
    try{
        const response = await apiConnector("POST",CREATE_SUBSECTION, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        console.log("CREATE SUBSECTION API REPONSE...", response)
        if(!response.data.success) {
            throw new Error ("Could not Create Sub-Section");
        }

        toast.success("Content Added");
        result = response?.data?.data;
    } catch(error){
        console.log("CREATE SUBSECTION API ERROR....", error);
    }
    return result;
}

// EDIT CONTENT
export const updateContent = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("PUT",EDIT_CONTENT, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        console.log("EDIT CONTENT API REPONSE...", response)
        if(!response.data.success) {
            throw new Error ("Could not Edit Content");
        }

        toast.success("Content Edited");
        result = response?.data?.data;
    } catch(error){
        console.log("EDIT CONTENT API ERROR....", error);
    }
    toast.dismiss(toastId);
    return result;
}

// EDIT SECTION
export const editSection = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("PUT",EDIT_SECTION, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        console.log("EDIT SECTION API REPONSE...", response)
        if(!response.data.success) {
            throw new Error ("Could not Edit Section");
        }

        toast.success("Section Edited");
        result = response?.data?.data;
    } catch(error){
        console.log("EDIT SECTION API ERROR....", error);
    }
    toast.dismiss(toastId);
    return result;
}

// EDIT SUB-SECTION
export const editSubSection = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("PUT",EDIT_SUBSECTION, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        console.log("EDIT SUB-SECTION API REPONSE...", response)
        if(!response.data.success) {
            throw new Error ("Could not Edit Sub-Section");
        }

        toast.success("Content Edited");
        result = response?.data?.data;
    } catch(error){
        console.log("EDIT SUB-SECTION API ERROR....", error);
    }
    toast.dismiss(toastId);
    return result;
}

// DELETE CONTENT
export const deleteContent = async(contentId, token) => {
    const toastId = toast.loading("Loading...");
    try{
        console.log("content id:- ", contentId);
        const response = await apiConnector("DELETE", DELETE_CONTENT, {contentId}, {
            Authorization: `Bearer ${token}`,
        })

        console.log("DELETE CONTENT API REPONSE...", response)
        if(!response.data.success) {
            throw new Error ("Could not Delete Content");
        }

        toast.success("Content Deleted");
    } catch(error){
        console.log("DELETE CONTENT API ERROR....", error);
    }
    toast.dismiss(toastId);
}

// DELETE SECTION
export const deleteSection = async(sectionId, contentId, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("DELETE",DELETE_SECTION, {sectionId, contentId}, {
            Authorization: `Bearer ${token}`,
        })

        console.log("DELETE SECTION API REPONSE...", response)
        if(!response?.data?.success) {
            throw new Error ("Could not Delete Section");
        }

        toast.success("Section Deleted");
        result = response?.data?.data;
    } catch(error){
        console.log("DELETE SECTION API ERROR....", error);
    }
    toast.dismiss(toastId);
    return result;
}

// DELETE SUB-SECTION
export const deleteSubSection = async(sectionId, subSectionId, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("DELETE",DELETE_SUBSECTION, {subSectionId, sectionId}, {
            Authorization: `Bearer ${token}`,
        })

        console.log("DELETE SUB-SECTION API REPONSE...", response)
        if(!response?.data?.success) {
            throw new Error ("Could not Delete Sub-Section");
        }

        toast.success("Sub-Section Deleted");
        result = response?.data?.data;
    } catch(error){
        console.log("DELETE SUB-SECTION API ERROR....", error);
    }
    toast.dismiss(toastId);
    return result;
}

// Get All Content
export const getAllContent = async() => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("GET", GET_ALL_CONTENT);
        console.log("GET ALL CONTENT REPONSE...", response);

        if(!response?.data?.success) {
            throw new Error ("Could not fetch Content");
        }

        result = response?.data?.data;
    } catch(error) {
        console.log("GET ALL CONTENT ERROR....", error);
    }
    toast.dismiss(toastId);
    return result;
}

// Get Content Details
export const getContentDetails = async(contentId) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("GET", GET_CONTENT_DETAILS, contentId);
        console.log("GET CONTENT DETAILS API REPONSE...", response);

        if(!response?.data?.success) {
            throw new Error ("Could not fetch Content Details");
        }

        result = response?.data?.data;
    } catch(error) {
        console.log("GET ALL CONTENT DETAILS API ERROR....", error);
    }
    toast.dismiss(toastId);
    return result;
}

// Get Artist Content
export const getArtistContent = async(token) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("GET", GET_ARTIST_CONTENT, null, 
        {
            Authorization: `Bearer ${token}`
        });
        console.log("GET ARTIST CONTENT API REPONSE...", response);

        if(!response?.data?.success) {
            throw new Error ("Could not fetch Artist Content");
        }

        result = response?.data?.data;
    } catch(error) {
        console.log("GET ARTIST CONTENT API ERROR....", error);
    }
    toast.dismiss(toastId);
    return result;
}

// Create Gallery 
export const createGallery = async(images, videos, contentId, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("POST", CREATE_GALLERY, 
            {images, videos, contentId},
            {Authorization: `Bearer ${token}`},
        )

        if(!response.data.success) {
            throw new Error ("Could not create gallery");
        }

        toast.success("Gallery Created Successfully");
        result = response?.data?.data;
    } catch(error) {
        console.log("CREATE GALLERY API ERROR....", error);
    }
    toast.dismiss(toastId);
    return result;
}

// Update Gallery 
export const updateGallery = async(images, videos, galleryId, contentId, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("PUT", UPDATE_GALLERY, 
            {images, videos, galleryId, contentId},
            {Authorization: `Bearer ${token}`},
        )

        if(!response.data.success) {
            throw new Error ("Could not Update gallery");
        }

        toast.success("Gallery Updated Successfully");
        result = response?.data?.data;
    } catch(error) {
        console.log("UPDATE GALLERY API ERROR....", error);
    }
    toast.dismiss(toastId);
    return result;
}

// Delete Gallery 
export const deleteGallery = async(galleryId, contentId, token) => {
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("DELETE", DELETE_GALLERY, 
            {galleryId, contentId},
            {Authorization: `Bearer ${token}`},
        )

        if(!response.data.success) {
            throw new Error ("Could not Delete gallery");
        }

        toast.success("Gallery Deleted Successfully");
    } catch(error) {
        console.log("DELETE GALLERY API ERROR....", error);
    }
    toast.dismiss(toastId);
}