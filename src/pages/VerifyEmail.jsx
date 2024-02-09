import React, { useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { FaArrowLeftLong } from "react-icons/fa6";
import { GiBackwardTime } from "react-icons/gi";
const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const {signupData, loading} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log("SIGNUP FORM DATA...", signupData);
    const {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
    } = signupData

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }
  return (
    <div className='text-white w-11/12 mx-auto h-[550px] items-center justify-center flex overflow-hidden'>
        {loading ? (<div className='loader'></div>)
            : (
                <div className='max-w-[500px] p-4 lg:p-8'>
                    <h2 className='text-[1.875rem] leading-[2.375rem] font-semibold'>Verify Email</h2>

                    <p  className='text-lg my-4 text-gray-400'>
                        A verification code has been sent to you. Enter the code below 
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        <OTPInput 
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={
                                (prop) => <input {...prop}
                                style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className='w-full rounded-lg p-3 bg-black text-white text-center mx-2'
                                />
                            }
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }}
                        />

                        <button type='submit'
                            className='w-full bg-yellow-400 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-black'
                        >   
                            Verify Email
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-between">
                        <div>
                            <Link to="/login"
                            className='flex items-center gap-3'
                            >
                                <FaArrowLeftLong />
                                <p>Back to Login</p>
                            </Link>
                        </div>

                        <button
                            className="flex items-center text-blue-100 gap-x-2"
                            onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                        >
                            <GiBackwardTime size={"24px"}/>
                            <p>Resend it</p>
                        </button>
                    </div>

                </div>
            )
        }
        
    </div>
  )
}

export default VerifyEmail