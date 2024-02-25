const {instance} = require("../config/razorpay");
const Content = require("../models/Content");
const User = require("../models/User");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const {contentPurchaseEmail} = require("../mail/templates/contentPurchaseEmail");
const ContentProgress = require("../models/ContentProgress");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
// Initiate the Razorpay Order
exports.capturePayment = async(req, res) => {
    const {contents} = req.body;
    const userId = req.user.id;

    if(contents.length === 0) {
        return res.json({
            success: false,
            message: "Please provide Content",
        });
    }

    let totalAmount = 0;
    for(const content_id of contents) {
        let content;
        try {
            content = await Content.findById(content_id);
            if(!content) {
                return res.status(200).json({
                    success: false,
                    message: "Could not find Content",
                })
            }

            const amount = content.price;
            totalAmount += amount
        } catch(error) {
            return res.status(400).json({
                success: false,
                message: "Error Occur while calculating Total Amount",
            });
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        res.status(200).json({
            success: true,
            message: "Order Created Successfully",
            data: paymentResponse, 
        })
    } catch(error) {
        console.log("ERROR IN CAPTURE PAYMENT...", error);
        return res.status(500).json({
            success: false,
            message: "Could not Initiate Order",
        });
    }
}

// Verify the Payment
exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body.razorpay_order_id;
    const razorpay_payment_id = req.body.razorpay_payment_id;
    const razorpay_signature = req.body.razorpay_signature;
    const contents = req.body.contents;
    const userId = req.user.id;

    
    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !contents || !userId) {
        return res.status(400).json({
            success: false,
            message: "Payment Failed",
        });
    }

    let body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");
    
    if(expectedSignature === razorpay_signature) {
        await addToBuyer(contents, userId, res);

        return res.status(200).json({
            success: true,
            message: "Payment Verified"
        });
    }
        
    return res.status(500).json({
        success: false,
        message: "Payment Verification Error",
    });
}

const addToBuyer = async(contents, userId, res) => {
    try {
        if(!userId || !contents) {
            return res.status(400).json({
                success: false,
                message: "UserId and Contents not Found",
            });
        }

        for(const contentId of contents) {
            try{
                const updatedContent = await Content.findByIdAndUpdate(
                    {_id: contentId},
                    {
                        $push: {
                            buyers: userId,
                        }
                    },
                    {new: true}    
                );
                
                const contentProgress = await ContentProgress.create({
                    contentId: updatedContent._id,
                    userId: userId,
                    completedSubSection: []
                })

                const updatedUser = await User.findByIdAndUpdate(
                    {_id: userId},
                    {
                        $push: {
                            contents: updatedContent._id,
                            contentProgress: contentProgress._id
                        }
                    },
                    {new: true}
                );
                

                const mailSenderResponse = await mailSender(
                    updatedUser?.email, 
                    `Successfully Purchased Content`, 
                    contentPurchaseEmail(updatedContent.contentName, updatedUser.firstName)
                );

            } catch(error) {
                console.log("ERROR THIS IS ERROR....", error)
                return res.status(400).json({
                    success: false,
                    message: "ERROR IN ADD TO BUYER...",
                    error: error
                })
            }
        }

    } catch(error) {
        console.log("ERROR IN ADD TO BUYER...", error);
        return res.status(400).json({
            success: false,
            message: "Error in addToBuyer",
            error: error,
        });
    }
}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;
    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please Provide all the fields",
        });
    }

    try {
        const userDetails = await User.findById({_id: userId});
        await mailSender(
            userDetails.email,
            'Payment Received',
            paymentSuccessEmail(
                userDetails.firstName,
                amount/100,
                orderId,
                paymentId 
            )
        );
    
    } catch(error) {
        console.log("ERROR IN SEND PAYMENT SUCCESS EMAIL CONTROLLER...", error);
        return res.status(500).json({
            success: false,
            message: "Could not send email",
            error: error,
        });
    }
}



