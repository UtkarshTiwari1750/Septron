import React from 'react'
import { useSelector } from 'react-redux'

const MyProfile = () => {
  const {user} = useSelector((state) => state.profile);
  return (
    <div className='p-16'>
      <div className='flex justify-between items-center pr-24 mr-20'>
        <div>
          <p className='text-white'>Name</p>  
          <span className='text-white'> {user?.firstName} </span>
          <span className='text-white'> {user?.lastName} </span>
        </div>

        <img src={user?.image} alt="Profile" 
          className='w-[45px] '
        />
      </div>

      <div className='text-white'>
        <p>About</p>
        <p>{user?.additionalDetails?.about}</p>
      </div>

      <div className='text-white'> 
        <p>Personal Details</p>

        <div>
          <div>
            <div>
              <p>First Name</p>
              <p>{user?.firstName}</p>
            </div>

            <div>
              <p>Last Name</p>
              <p>{user?.lastName}</p>
            </div>
          </div>

          <div>
            <div>
              <p>Phone Number</p>
              <p>{user?.additionalDetails?.phoneNo}</p>
            </div>

            <div>
              <p>Email</p>
              <p>{user?.email}</p>
            </div>
          </div>

          <div>
            <div>
              <p>Gender</p>
              <p>{user?.additionalDetails?.gender}</p>
            </div>

            <div>
              <p>Date of Birth</p>
              <p>{user?.additionalDetails?.dateOfBirth}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile