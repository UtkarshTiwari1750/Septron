import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Button from '../../common/Button';
import { HiMiniEye } from "react-icons/hi2";
import { HiEyeSlash } from "react-icons/hi2";
import { login } from '../../../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleOnSubmit = async(data) => {
      const {email, password} = data;
      dispatch(login(email, password, navigate));
    }

  return (
    <form className='flex flex-col justify-between gap-y-7 w-[60%] '
      onSubmit={handleSubmit(handleOnSubmit)}
    >
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

      <Button 
          text="Login"
          type="submit"
          customClasses={'text-white mt-4'}
      />
    </form>
  )
}

export default LoginForm