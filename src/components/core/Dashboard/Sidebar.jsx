import React, { Children, useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { Link, useNavigate } from 'react-router-dom'
import SidebarLinks from './SidebarLinks'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmationModal from '../../common/ConfirmationModal'
import { logout } from '../../../services/operations/authAPI'
import { VscSignOut } from 'react-icons/vsc'

const Sidebar = () => {
  const {user} = useSelector((state) => state.profile);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("USER...", user);
  return (
    <div className='w-[17%]'>
      <div className='w-full bg-gray-800 bg-opacity-50 rounded-r-lg backdrop-blur-lg text-white h-[100vh] relative bottom-0'>
        <div className='flex flex-col gap-y-3'>
          <Link to="/" 
          className='flex items-start pl-6 pt-6'>
            <img src="https://firebasestorage.googleapis.com/v0/b/septron-909d2.appspot.com/o/Septron%2Ffavicon-white.png?alt=media&token=a75dc966-8baf-4789-bc44-9ee101ded060" 
              alt="Logo" 
              className='w-10'
            />
            <p className='text-3xl ml-3'>Septron</p>
          </Link>

          <div className='mt-3 flex flex-col gap-y-1'>
            {sidebarLinks.map((link, key) => {
              if(link.type && user?.accountType !== link.type) return null;
              return (
                <SidebarLinks link={link} iconName={link.icon} />
              )
            })}
          </div>

          <div className='mt-3 flex flex-col'>
            <SidebarLinks 
              link={{name: "Setting", path: "/dashboard/settings"}} 
              iconName="VscSettingsGear"
            />

            <button
              onClick={() => setConfirmationModal({
                text1: "Are you sure ?",
                text2: "Please Don't Leave us",
                gif:"https://firebasestorage.googleapis.com/v0/b/septron-909d2.appspot.com/o/Septron%2FGifs%2FDon'tLeave.gif?alt=media&token=c85a07f8-f60d-4dc7-a907-e787cd8e6ad6",
                btn1Text: "Leave",
                btn2Text: "Stay",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null)
              })}
            >
              <div className='flex items-center gap-x-2 pl-4'>
                <span>Logout</span>
                <VscSignOut  className="text-lg" />
              </div>
            </button>
          </div>

        </div>
      </div>
      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
      }
    </div>
  )
}

export default Sidebar