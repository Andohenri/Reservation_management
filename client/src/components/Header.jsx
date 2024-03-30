import { Link, NavLink } from "react-router-dom"
import { FaHome, FaQuestion } from 'react-icons/fa'

const Header = () => {
  return (
    <nav className="w-full p-4 bg-[#07143F] text-gray-200 z-50">
      <div className="flex max-w-5xl mx-auto justify-between items-center z-99">
         <Link to={'/'}>
            <h1 className="text-xl md:text-2xl whitespace-nowrap font-bold">
               Employee <span className="bg-gradient-to-r from-[#FAB440] to-[#4E47C6] rounded-lg text-white py-1 px-2 md:py-1.5 md:px-4">Management</span>
            </h1>
         </Link>
         <div className="flex gap-8 text-lg items-center font-semibold">
            <NavLink to={'/'} className='flex items-center gap-1 flex-1'>
               <FaHome className='h-8 w-8 sm:h-6 sm:w-6'/>
               <span className="hidden sm:inline">Acceuil</span>
            </NavLink>
            <NavLink to={'/about'} className='flex items-center gap-1 flex-1'>
               <FaQuestion className="h-8 w-8 sm:h-6 sm:w-6"/>
               <span className="hidden sm:inline">About</span>
            </NavLink>
         </div>
      </div>
    </nav>
  )
}

export default Header