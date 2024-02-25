import React, { useEffect, useState } from 'react'
import logo from "../../assets/png/logo-white-transparent.png"
import {AiOutlineSearch} from 'react-icons/ai';
import Button from './Button';
import { NavLink,Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { getAllContentName } from '../../services/operations/contentAPI';
import { NavbarLinks } from '../../data/navbar-links';
import { useSelector } from 'react-redux';
import { setCurrentPage } from '../../slices/navigateSlice';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
const Navbar = () => {
  const [allContentNames, setAllContentNames] = useState([]);
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.profile);
  const {pathname} = useLocation();


  useEffect(() => {
    ;(async()=>{
      const response = await getAllContentName();
      if(response.length > 0){
        console.log("CONTENT NAME...", response)
        setAllContentNames(response);
      }
    })()
  }, [])

  allContentNames?.map((content) => {
    console.log("CONTENTNAMES...", content?.contentName)
  })
  console.log("USER...",user);
  return (
    <nav className='container py-4'>
        <div className='w-[90%] mx-auto flex justify-between items-center text-white'>
            <div className='w-[5%]'>
              <Link to="/">
                <img src="https://firebasestorage.googleapis.com/v0/b/septron-909d2.appspot.com/o/Septron%2Flogo-white-transparent.png?alt=media&token=964bf6a7-a22e-4ebe-bf85-5344e419710a" 
                alt="logo" className=''/>
              </Link>
            </div>
            
            <div className='font-Roboto w-[35%] flex justify-between items-center'>
              {
                NavbarLinks.map((link, index) => (
                  <>
                    
                    <Link to={link.path} 
                      className={`${pathname === link.path ? "before:w-[70%]" : ""} text-lg font-poppins flex justify-center relative px-6 py-2 opacity-80 before:transition-all before:duration-300 before:h-1 before:content-[""] before:absolute before:bg-purpleNeon
                      before:w-0 before:bottom-0 hover:before:w-[70%] before:rounded-lg hover:opacity-100`}
                      key={index}
                      >
                      {link.title}
                    </Link>
                  </>
                ))
              }
            </div>
            
            <div className='w-[45%] flex justify-between items-center'>
                <div className='flex group justify-between items-center relative'>

                  <input type="text" placeholder='Search' 
                    className='bg-transparent font-poppins placeholder:font-poppins border border-white px-4 py-1 outline-none rounded-full font-Roboto placeholder:font-Roboto'
                  />
                  <AiOutlineSearch size={25}
                    className='cursor-pointer absolute right-4 '  
                  />
                  
                  <div
                    className='absolute text-black top-9 bg-white w-full opacity-0 group-hover:opacity-100 '
                  >
                    {allContentNames.length > 0 && (
                      allContentNames.map((content, index) => (
                        <p className='hover:bg-gray-300 px-4 py-2'
                        >
                          {content?.contentName}
                        </p>
                      ))
                    )}
                  </div>
                </div>

                {user 
                  ? (
                      <div className='flex justify-between gap-4'>
                        <Button text="Dashboard" handleOnClick={() => navigate("/dashboard/my-profile")} />
                        <ProfileDropDown userImage={user?.image} />
                      </div>
                    )
                  : (
                      <div className='flex justify-between gap-4'>
                        <Button text='Login' handleOnClick={() => navigate("/login")}/>
                        <Button text='Sign Up' handleOnClick={() => navigate("/signup")} />
                      </div>
                    ) 
                }
                
            </div>
        </div>
    </nav>
  )
}

export default Navbar