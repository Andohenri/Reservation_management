import React from 'react'
import { FaHome } from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <main className=' relative max-w-5xl mx-auto p-6'>
      <aside className='absolute top-6 right-full text-white w-1/6 bg-gradient-to-br from-[#07143F] to-[#483d9b] backdrop-blur-lg'>
        <NavLink to={'/dashboard'} className='flex items-center gap-2'>
          <FaHome className='h-8 w-8 sm:h-6 sm:w-6'/>
          <span className="hidden sm:inline">Acceuil</span>
        </NavLink>
      </aside>
      <div className='w-5/6'>
        <Outlet />
      </div>
    </main>
  )
}

export default Dashboard