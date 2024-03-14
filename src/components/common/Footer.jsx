import React from 'react'
import { footerLink } from '../../data/footerLink'
import * as Icon from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links';

const Footer = () => {
  const {pathname} = useLocation();

  return (
    <div className='text-white py-20 bg-black/80 px-20 flex items-center justify-between'>

      <div className='flex gap-x-4 items-center w-[30%]'>
        <div className='w-[20%]'>
          <Link to="/">
            <img src="https://firebasestorage.googleapis.com/v0/b/septron-909d2.appspot.com/o/Septron%2Flogo-white-transparent.png?alt=media&token=964bf6a7-a22e-4ebe-bf85-5344e419710a" 
            alt="logo" className=''/>
          </Link>
        </div>

        <h2 className='font-roboto text-xl'>
          Made by Utkarsh 😁
        </h2>
      </div>

      <div className='font-Roboto w-[35%] flex  items-center'>
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

      <div className='flex justify-start gap-x-5'>
          {footerLink.map((link, index) => {
              const IconName = link.icon;
              const Icon1 = Icon[IconName];
              return (
                <>
                  <a href={link.path} target='_blank' className='p-3 rounded-full border border-white text-xl cursor-pointer hover:scale-125 transition-all duration-300 hover:bg-white hover:text-black'>
                    <Icon1/>
                  </a>
                </>
              )
          })}
      </div>

    </div>
  )
}

export default Footer