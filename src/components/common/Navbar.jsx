import React from 'react'
import logo from "../../assets/png/logo-white-transparent.png"
import {AiOutlineSearch} from 'react-icons/ai';
import Button from './Button';
const Navbar = () => {
  return (
    <nav className='container py-4'>
        <div className='w-[90%] mx-auto flex justify-between items-center text-white'>
            <div className='w-[5%]'>
              <img src={logo} alt="logo" className=''/>
            </div>
            
            <div className='font-Roboto w-[35%] flex justify-between items-center'>
              <p className='cursor-pointer'>
                Action
              </p>
              <p className='cursor-pointer'>
                Fantasy
              </p>
              <p className='cursor-pointer'>
                Romance
              </p>
              <p className='cursor-pointer'>
                Comedy
              </p>
            </div>
            
            <div className='w-[45%] flex justify-between items-center'>
                <div className='flex justify-between items-center relative'>
                  <input type="text" placeholder='Search' 
                    className='bg-transparent border border-white px-4 py-1 outline-none rounded-full font-Roboto placeholder:font-Roboto'
                  />
                  <AiOutlineSearch className='cursor-pointer absolute right-4 '/>
                </div>
  

                <Button text='Login' />
                <Button text='Sign Up' />
            </div>
        </div>
    </nav>
  )
}

export default Navbar