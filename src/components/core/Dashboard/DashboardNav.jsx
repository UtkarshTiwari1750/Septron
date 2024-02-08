import React, { useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai';
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardNav = () => {
    const [allContentNames, setAllContentNames] = useState([]);
    const {user} = useSelector((state) => state.profile);

    // useEffect(() => {
  //   ;(async()=>{
  //     const response = await getAllContentName();
  //     if(response.length > 0){
  //       setAllContentNames(response);
  //     }
  //   })()
  // })
  return (
    <div className='flex justify-between items-center'>
        <div className='flex group justify-between items-center relative w-[25%] text-white'>
            <input type="text" placeholder='Search' 
            className='bg-transparent border border-white px-4 py-2 outline-none rounded-full w-full'
            />
            <AiOutlineSearch className='cursor-pointer absolute right-4 text-xl'/>
            
            {allContentNames.length > 0 && (
            allContentNames.map((contentName, index) => (
                <div className='absolute text-black top-9 bg-white w-full none group-hover:opacity-100'>
                <p className='hover:bg-gray-300 px-4 py-2'>Hello</p>
                </div>
            ))
            )}
        </div>
        
        <div className='flex justify-between items-center w-[15%] pr-6'>
            <Link to="/dashboard/settings" className='text-white p-2 bg-gray-800 rounded-full text-xl cursor-pointer '>
                <IoSettingsOutline />
            </Link>
            
            <Link to="/dashboard/cart" className='text-white p-2 bg-gray-800 rounded-full text-xl cursor-pointer '>
                <MdOutlineShoppingCart />
            </Link>

            <img src={user?.image} alt="User" 
                className='w-[44px] h-[44px] rounded-full cursor-pointer'
            />
        </div>

    
    </div>
  )
}

export default DashboardNav