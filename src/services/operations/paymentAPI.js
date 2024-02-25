import toast from "react-hot-toast";
import {apiConnector} from "../apiConnector";
import { paymentEndpoints } from "../apis";

const {
    CAPTURE_PAYMENT,
    SEND_PAYMENT_SUCCESS_EMAIL,
    VERIFY_PAYMENT} = paymentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }

        document.body.appendChild(script);
    })
}


export async function buyContent(token, contents, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");

    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("Razorpay SDK failed to load");
            return;
        }

        const orderResponse = await apiConnector("POST", CAPTURE_PAYMENT,
                                                {contents},
                                                {
                                                    Authorization: `Bearer ${token}`
                                                })
        if(!orderResponse?.data?.success) {
            throw new Error(orderResponse.data.message);
        }

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse?.data?.data?.amount}`,
            order_id: orderResponse?.data?.data?.id,
            name: "Septron",
            description: "Thanks You for Purchasing",
            imgage: "https://firebasestorage.googleapis.com/v0/b/septron-909d2.appspot.com/o/Septron%2Flogo-black-transparent.png?alt=media&token=c1e18bd2-62d7-4c22-9e4f-3c7890c50474",
            prefill: {
                name: `${userDetails?.firstName}`,
                email: userDetails?.email,
            },
            handler: function(response) {
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);

                verifyPayment({...response, contents}, token, navigate, dispatch);
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("Payment Failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
    } catch(error) {
        console.log("BUY CONTENT API ERROR...", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },
        {
            Authorization: `Bearer ${token}`
        })
    } catch(error) {
        console.log("SEND PAYMENT SUCCESS EMAIL API ERROR....", error);
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...");
    try {
        const response = await apiConnector("POST", VERIFY_PAYMENT, bodyData,
        {
            Authorization: `Bearer ${token}`
        });
        if(!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Payment successful, you are added to the content");
        navigate("/dashboard/buyed-content");
    } catch(error) {
        console.log("PAYMENT VERIFY ERROR...", error);
        toast.error("Could not Verify Payment");
    }
    toast.dismiss(toastId);
}

