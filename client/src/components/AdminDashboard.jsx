import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { IoMdTrain, IoMdAnalytics } from 'react-icons/io'
import { GiRailRoad } from 'react-icons/gi'
import { RiComputerFill } from 'react-icons/ri'
import { useSelector } from 'react-redux';
import { Navigate, NavLink, Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  const { userInfo } = useSelector(state => state.auth);


  return (
    <main className='relative max-w-6xl mx-auto px-4 py-6'>
      <aside className='fixed top-24 p-2 flex flex-col gap-1 right-0 text-gray-800 shadow rounded'>
        <NavLink to={'/admin/dashboard'} className='flex mt-2 items-center gap-2'>
          <IoMdAnalytics className='h-8 w-8 sm:h-6 sm:w-6'/>
          <span className="hidden sm:inline">Dashboard</span>
        </NavLink>
        <NavLink to={'/admin/reservations'} className='flex mt-2 items-center gap-2'>
          <RiComputerFill className='h-8 w-8 sm:h-6 sm:w-6'/>
          <span className="hidden sm:inline">Résérvations</span>
        </NavLink>
        <NavLink to={'/admin/trips'} className='flex mt-2 items-center gap-2'>
          <GiRailRoad className='h-8 w-8 sm:h-6 sm:w-6'/>
          <span className="hidden sm:inline">Voyages</span>
        </NavLink>
        <NavLink to={'/admin/trains'} className='flex mt-2 items-center gap-2'>
          <IoMdTrain className='h-8 w-8 sm:h-6 sm:w-6'/>
          <span className="hidden sm:inline">Trains</span>
        </NavLink>
        <NavLink to={'/admin/users'} className='flex mt-2 items-center gap-2'>
          <FaUsers className='h-8 w-8 sm:h-6 sm:w-6'/>
          <span className="hidden sm:inline">Clients</span>
        </NavLink>
      </aside>
      <div className=''>
        {userInfo && userInfo.isAdmin ? (
          <Outlet />
        ) : (
          <Navigate to={'/login'}/>
        )}
      </div>
    </main>
  )
}

export default AdminDashboard