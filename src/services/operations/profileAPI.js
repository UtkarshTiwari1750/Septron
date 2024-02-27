import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";

import { logout } from "./authAPI";

const {
    DELETE_ACCOUNT,
    GET_BUYED_CONTENT,
    UPDATE_PROFILE
} = profileEndpoints;

export const deleteAccount = async(dispatch, token, navigate) => {
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("DELETE", DELETE_ACCOUNT, null, 
            {Authorization: `Bearer ${token}`}
        )

        console.log("DELETE ACCOUNT RESPONSE...", response);
        if(!response?.data?.success) {
            throw new Error ("Could not Delete Account");
        }

        toast.success("Account Deleted Successfully");
        dispatch(logout(navigate));
    } catch(error) {
        console.log("DELETE ACCOUNT API ERROR....", error);
        toast.error("Could Not Delete Account");
    }
    toast.dismiss(toastId);
}

export const getBuyedContent = async(token) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
        const response = await apiConnector("GET", GET_BUYED_CONTENT, null, 
            {Authorization: `Bearer ${token}`}
        )

        console.log("GET BUYED CONTENT RESPONSE...", response);
        if(!response?.data?.success) {
            throw new Error ("Could not get buyed content");
        }

        toast.success("Content Fetched Successfully");
        result = response?.data?.data;
    } catch(error) {
        console.log("GET BUYED CONTENT API ERROR....", error);
    }
    toast.dismiss(toastId);
    return result;
}