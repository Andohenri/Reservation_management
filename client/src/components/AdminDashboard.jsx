import React from 'react'
import { FaHome } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { Navigate, NavLink, Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  const { userInfo } = useSelector(state => state.auth);


  return (
    <main className='relative max-w-6xl mx-auto px-4 py-6'>
      <aside className='fixed top-24 p-2 mt-2 right-0 text-gray-900'>
        <NavLink to={'/admin/dashboard'} className='flex items-center gap-2'>
          <FaHome className='h-8 w-8 sm:h-6 sm:w-6'/>
          <span className="hidden sm:inline">Dashboard</span>
        </NavLink>
        <NavLink to={'/admin/reservations'} className='flex items-center gap-2'>
          <FaHome className='h-8 w-8 sm:h-6 sm:w-6'/>
          <span className="hidden sm:inline">Résérvations</span>
        </NavLink>
        <NavLink to={'/admin/trips'} className='flex items-center gap-2'>
          <FaHome className='h-8 w-8 sm:h-6 sm:w-6'/>
          <span className="hidden sm:inline">Voyages</span>
        </NavLink>
        <NavLink to={'/admin/trains'} className='flex items-center gap-2'>
          <FaHome className='h-8 w-8 sm:h-6 sm:w-6'/>
          <span className="hidden sm:inline">Trains</span>
        </NavLink>
        <NavLink to={'/admin/users'} className='flex items-center gap-2'>
          <FaHome className='h-8 w-8 sm:h-6 sm:w-6'/>
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