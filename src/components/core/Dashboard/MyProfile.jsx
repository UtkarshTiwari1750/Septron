import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../../common/Button';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";

const MyProfile = () => {
  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div>
      <div className='flex items-center ml-[4.3rem] text-3xl mt-5'>
        <p className='text-transparent  pt-4
          relative bg-[length:400%] justify-center gap-3 items-center bg-clip-text -top-1 -bottom-1 
          -left-1 -right-1 bg-gradient-to-r  rounded-md animationText from-indigo-500 via-yellow-300 
          to-pink-500 transition-all duration-300
        '>
          Hello {user?.firstName} {" "} {user?.lastName} 
        </p>
        <span>👋😁</span>

      </div>
      <div className='p-16 pt-5'>
        <div className='p-10 mr-20 pr-48 z-50 bg-slate-500 bg-transparent backdrop-blur-sm rounded-lg shadow-[0_0_15px_2px] shadow-gray-500
          flex flex-col gap-y-4
        '>
          
          <div className='flex justify-between items-center'>
            <div className='flex justify-between items-center w-[28%]'>
              <p className='text-gray-500 text-lg font-semibold font-poppins'>Name:- </p>
              <div>
                <p className='text-white font-roboto font-semibold text-xl'> {user?.firstName} {" "} {user?.lastName}</p>
              </div>  
            </div>

            <img src={user?.image} alt="Profile" 
              className='w-[45px] '
            />

            <Button 
              text="Edit"
              handleOnClick={() => navigate("/dashboard/setting")}
              customClasses={"text-white"}
            >
              <FiEdit />
            </Button>
          </div>

          <div className='text-white'>
            <div className='flex w-full justify-between items-center'>
              <p className='text-gray-300 text-lg font-semibold font-poppins'>About</p>
              <Button 
                text="Edit"
                handleOnClick={() => navigate("/dashboard/setting")}
              >
                <FiEdit />
              </Button>
            </div>
            <p className='mt-4'>{user?.additionalDetails?.about}</p>
          </div>

          <div className='text-white'> 
            <div className='flex justify-between w-full items-center'>
              <p className='text-gray-300 text-lg font-semibold font-poppins'>Personal Details</p>
              <Button 
                text="Edit"
                handleOnClick={() => navigate("/dashboard/setting")}
                customClasses={"text-white"}
              >
                <FiEdit />
              </Button>
            </div>

            <div className='flex flex-col w-full justify-between mt-2 gap-y-3'>
              <div className='flex w-full justify-between'>
                <div className='w-[45%]'>
                  <p className='text-gray-500 text-lg font-semibold font-poppins'>First Name</p>
                  <p className='font-roboto'>{user?.firstName}</p>
                </div>

                <div className='w-[25%]'>
                  <p className='text-gray-500 text-lg font-semibold font-poppins'>Last Name</p>
                  <p className='font-roboto'>{user?.lastName}</p>
                </div>
              </div>

              <div className='flex w-full justify-between'>
                <div className='w-[55%]'>
                  <p className='text-gray-500 text-lg font-semibold font-poppins'>Phone Number</p>
                  <p className='font-roboto'>{user?.additionalDetails?.phoneNo}</p>
                </div>

                <div className='w-[25%]'>
                  <p className='text-gray-500 text-lg font-semibold font-poppins'>Email</p>
                  <p className='font-roboto'>{user?.email}</p>
                </div>
              </div>

              <div className='flex w-full justify-between'>
                <div className='w-[45%]'>
                  <p className='text-gray-500 text-lg font-semibold font-poppins'>Gender</p>
                  <p className='font-roboto'>{user?.additionalDetails?.gender}</p>
                </div>

                <div className='w-[25%]'>
                  <p className='text-gray-500 text-lg font-semibold font-poppins'>Date of Birth</p>
                  <p className='font-roboto'>{user?.additionalDetails?.dateOfBirth}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile