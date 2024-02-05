import { contentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import {setLoading, setToken} from "../../slices/authSlice"
import { toast } from "react-hot-toast";

const {
    GET_ALL_CONTENT_NAME,
} = contentEndpoints

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