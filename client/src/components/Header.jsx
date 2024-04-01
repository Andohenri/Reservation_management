import { Link, NavLink } from "react-router-dom"
import { FaAnchor, FaDatabase, FaHome, FaPhone, FaQuestionCircle, FaTripadvisor } from 'react-icons/fa'
import { useSelector } from "react-redux"

const Header = () => {
   const { userInfo } = useSelector(state => state.auth)
  return (
    <nav className="w-full p-4 bg-[#07143F] text-gray-200 z-50">
      <div className="flex gap-4 max-w-5xl mx-auto justify-between flex-col md:flex-row md:items-center z-10">
         <Link to={'/'}>
            <h1 className="text-xl md:text-2xl whitespace-nowrap font-bold">
               <span className="bg-gradient-to-r from-[#FAB440] to-[#4E47C6] rounded-lg text-white py-1 px-2 md:py-1.5 md:px-4">Train-Trip</span>
            </h1>
         </Link>
         <div className="flex gap-4 text-lg justify-between font-semibold">
            <NavLink to={'/'} className='flex items-center gap-2'>
               <FaHome className='h-8 w-8 sm:h-6 sm:w-6'/>
               <span className="hidden sm:inline">Acceuil</span>
            </NavLink>
            {userInfo && <>
               <NavLink to={'/trip'} className='flex items-center gap-2'>
                  <FaTripadvisor className="h-8 w-8 sm:h-6 sm:w-6"/>
                  <span className="hidden sm:inline">Voyage</span>
               </NavLink>
               <NavLink to={'/trip'} className='flex items-center gap-2'>
                  <FaAnchor className="h-8 w-8 sm:h-6 sm:w-6"/>
                  <span className="hidden sm:inline">Advice</span>
               </NavLink>
               <NavLink to={'/contact'} className='flex items-center gap-2'>
                  <FaPhone className="h-8 w-8 sm:h-6 sm:w-6"/>
                  <span className="hidden sm:inline">Contact</span>
               </NavLink>
            </>}
            {userInfo && userInfo.isAdmin && 
               <NavLink to={'/dashboard'} className='flex items-center gap-2'>
                  <FaDatabase className="h-8 w-8 sm:h-6 sm:w-6"/>
                  <span className="hidden sm:inline">Dashboard</span>
               </NavLink>
            }
            <NavLink to={'/info-politics'} className='flex items-center gap-2'>
               <FaQuestionCircle className="h-8 w-8 sm:h-6 sm:w-6"/>
               <span className="hidden sm:inline">About</span>
            </NavLink>
         </div>
      </div>
    </nav>
  )
}

export default Header