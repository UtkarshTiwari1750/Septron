import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Button from '../../common/Button';
import { setSignupData } from '../../../slices/authSlice';
import { useDispatch } from 'react-redux';
import {toast} from 'react-hot-toast';
import { sendOtp } from '../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { HiMiniEye } from "react-icons/hi2";
import { HiEyeSlash } from "react-icons/hi2";

const SignupForm = ({accountType}) => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const onSubmitHandle = (data) => {
        console.log("SIGNUP FORM DATA BEFORE...", data);
        if(data?.password !== data?.confirmPassword){
            toast.error("Password Do Not Match");
            return;
        }

        data.accountType = accountType;
        dispatch(setSignupData(data));
        console.log("SIGNUP FORM DATA...", data);

        dispatch(sendOtp(data?.email, navigate));
    }
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmitHandle)}
            className='flex flex-col justify-between gap-y-4'
        >
            <div className='flex justify-between gap-x-5'>
                <div className='relative'>
                    <input 
                        type="text" 
                        id='firstName'
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                        border border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                        dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " 
                        {...register("firstName", {required: true})}
                    />
                    <label htmlFor="firstName"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                        -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                        dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                        peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                        rtl:peer-focus:left-auto start-1"
                    >
                        First Name <sup>*</sup>
                    </label>
                    {errors.firstName && (
                        <span className='text-red-500 text-xs absolute'>
                            First Name is required
                        </span>
                    )}
                </div>

                <div className='relative'>
                    <input 
                        type="text" 
                        id='lastName'
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                        border border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                        dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " 
                        {...register("lastName", {required: true})}
                    />
                    <label htmlFor="lastName"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                        -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                        dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                        peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                        rtl:peer-focus:left-auto start-1"
                    >
                        Last Name <sup>*</sup>
                    </label>
                    {errors.lastName && (
                        <span className='text-red-500 text-xs absolute'>
                            Last Name is required
                        </span>
                    )}
                </div>
            </div>

            <div className='relative'>
                <input 
                    type="email" 
                    id='email'
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                    border border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                    dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    placeholder=" " 
                    {...register("email", {required: true})}
                />
                <label htmlFor="email"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                    -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                    dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                    peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                    rtl:peer-focus:left-auto start-1"
                >
                    Email <sup>*</sup>
                </label>
                
                {errors.email && (
                    <span className='text-red-500 text-xs absolute'>
                        Email is required
                    </span>
                )}
            </div>

            <div className='relative'>
                <input 
                    type={showPassword ? "text" : "password"}
                    id='password' 
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                    border border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                    dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    placeholder=" " 
                    {...register("password", {required: true})}
                />
                <label htmlFor="password"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                    -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                    dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                    peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                    rtl:peer-focus:left-auto start-1"
                >
                    Password <sup>*</sup>
                </label>
                <div 
                    className='text-gray-300 absolute cursor-pointer right-5 text-2xl bottom-2'
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? (<HiMiniEye />) : (<HiEyeSlash />) }
                </div>
                {errors.password && (
                    <span className='text-red-500 text-xs absolute'>
                        Password is required
                    </span>
                )}
            </div>

            <div className='relative'>
                <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    id='confirmPassword'
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                    border border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                    dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    placeholder=" " 
                    {...register("confirmPassword", {required: true})}
                />
                <label htmlFor="confirmPassword"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                    -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                    dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                    peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                    rtl:peer-focus:left-auto start-1"
                >
                    Confirm Password <sup>*</sup>
                </label>
                <div 
                    className='text-gray-300 absolute cursor-pointer right-5 text-2xl bottom-2'
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                    {showConfirmPassword ? (<HiMiniEye />) : (<HiEyeSlash />) }
                </div>
                {errors.confirmPassword && (
                    <span className='text-red-500 text-xs absolute'>
                        Confirm Password is required
                    </span>
                )}
            </div>

            <Button 
                text="Sign Up"
                type="submit"
                customClasses={'text-white mt-4'}
            />

        </form>
    
    </div>
  )
}

export default SignupForm