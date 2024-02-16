import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";

import { logout } from "./authAPI";

const {
    DELETE_ACCOUNT
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
