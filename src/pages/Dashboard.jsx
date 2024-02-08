import React from 'react'
import Sidebar from '../components/core/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
const Dashboard = () => {
  return (
    <div className='flex'>
      <Sidebar />

      <Outlet />
    </div>
  )
}

export default Dashboard