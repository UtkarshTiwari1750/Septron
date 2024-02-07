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
    <div className='text-white'>
        <div>
            <h2>Verify Email</h2>

            <p>
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
                />

                <button type='submit'
                    className='text-white'
                    onClick={handleOnSubmit}
                >   
                    Verify Email
                </button>
            </form>

            <div>
                <div>
                    <Link to="/login">
                        <FaArrowLeftLong />
                        <p>Back to Login</p>
                    </Link>
                </div>

                <button
                onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                >
                    <GiBackwardTime size={"24px"}/>
                    <p>Resend it</p>
                </button>
            </div>

        </div>
    </div>
  )
}

export default VerifyEmail