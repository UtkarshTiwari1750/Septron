import React from 'react'
import Sidebar from '../components/core/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import DashboardNav from '../components/core/Dashboard/DashboardNav'
const Dashboard = () => {
  return (
    <div className='flex gap-5'>
      <Sidebar />
      <div className='flex flex-col p-5 w-full'>
        <DashboardNav />

        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard