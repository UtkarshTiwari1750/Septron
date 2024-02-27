import React, { useEffect, useRef, useState } from 'react'
import { ProfileDropDownLinks } from '../../../data/profileDropDownLinks'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import { logout } from '../../../services/operations/authAPI'
import * as Icon1 from "react-icons/cg";
import * as Icon2 from 'react-icons/io5';
import * as Icon3 from "react-icons/vsc";
import * as Icon4 from "react-icons/rx";
import * as Icon5 from "react-icons/io";
import * as Icon6 from "react-icons/bi";
import { VscSignOut } from 'react-icons/vsc'


const ProfileDropDown = ({userImage}) => {
    const {user} = useSelector((state) => state.profile);
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ref = useRef(null);
    useOnClickOutside(ref, () => setShow(false));

    if(!user) return null;

  return (
    <div className='relative w-full group'
        onClick={() => setShow(true)}

    >
        <img src={userImage} alt="User" 
            className='w-[44px] h-[44px] rounded-full cursor-pointer'
        />
        {show && (
            <div 
                className='text-black flex flex-col absolute -left-24 top-12' 
                ref={ref}
                onClick={(e) => e.stopPropagation()}
            >
                <div className='backdrop-blur-md w-48 rounded-lg px-2 py-2 shadow-lg ring-1 ring-black/5 bg-black/40 backdrop:blur-lg isolate'>
                    {ProfileDropDownLinks && ProfileDropDownLinks.map((link, index) => {
                        const iconName = link.icon;
                        const Icon = Icon1[iconName] || Icon2[iconName] || Icon3[iconName] || 
                                    Icon4[iconName] || Icon5[iconName] || Icon6[iconName];
                        return( <>
                            {(link?.type && user?.accountType !== link?.type) 
                                ? (
                                    <div>
                                    </div>
                                )
                                : (
                                    <Link to={link.path}>
                                        <div className='w-full px-3 py-2 font-roboto  hover:bg-white/10 rounded-lg text-white/65 hover:text-white 
                                                        font-semibold flex items-center gap-x-2'
                                        >
                                            <Icon/>
                                            {link.title}
                                        </div>
                                    </Link>
                                )
            
                            }
                        </>)

                    })}

                    <div className='w-full px-3 py-2 flex items-center gap-x-2 font-roboto cursor-pointer hover:bg-white/10 rounded-lg text-white/65 hover:text-white font-semibold'
                        onClick={() => {
                            dispatch(logout(navigate))
                            setShow(false)
                        }}
                    >
                        <VscSignOut  className="text-lg" />
                        Logout
                    </div>
                </div>
            </div>
        )}

    </div>
  )
}

export default ProfileDropDown