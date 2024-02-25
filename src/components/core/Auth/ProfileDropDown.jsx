import React, { useState } from 'react'
import { ProfileDropDownLinks } from '../../../data/profileDropDownLinks'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProfileDropDown = ({userImage}) => {
    const {user} = useSelector((state) => state.profile);
    const [show, setShow] = useState(false)
    console.log("USER..", user)
  return (
    <div className='relative w-full group'>
        <img src={userImage} alt="User" 
            onClick={() => setShow((prev) => !prev)}
            className='w-[44px] h-[44px] rounded-full cursor-pointer'
        />
        {show && (
            <div className='text-black flex flex-col absolute -left-24 top-12'>
                <div className='backdrop-blur-md w-48 rounded-lg px-2 py-2 shadow-lg ring-1 ring-black/5 bg-white/20 backdrop:blur-lg isolate'>
                    {ProfileDropDownLinks && ProfileDropDownLinks.map((link, index) => (
                        <div className='w-full px-3 py-2 font-roboto hover:bg-white/10 rounded-lg text-black hover:text-white font-semibold'>
                            {(link?.type && user?.accountType !== link?.type) 
                                ? (
                                    <div>
                                    </div>
                                )
                                : (
                                    <Link to={link.path}>
                                        {link.title}
                                    </Link>
                                )
            
                            }
                        </div>

                    ))}
                </div>
            </div>
        )}

    </div>
  )
}

export default ProfileDropDown