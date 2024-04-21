import { Link, NavLink, useNavigate } from "react-router-dom"
import { FaHome, FaUserCog, FaCaretDown } from 'react-icons/fa'
import { MdAdminPanelSettings, MdLogout, MdContactSupport, MdContactPhone, MdTravelExplore } from 'react-icons/md';
import { GiHiveMind } from 'react-icons/gi'
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { useLogoutMutation } from "../redux/api/userApiSlice";
import { logout } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import NotifButton from "./NotifButton";
import ProfileImage from '../assets/profile.jpg';

const Header = () => {
   const { userInfo } = useSelector(state => state.auth);
   const { notifExpand } = useSelector(state => state.notif);
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const [expand, setExpand] = useState(false)
   const [logoutUser] = useLogoutMutation()
   const expandMenu = () => {
      setExpand((prev) => !prev)
   }
   const logoutHandler = async () => {
      try {
        await logoutUser().unwrap()
        dispatch(logout())
        navigate('/login')
      } catch (error) {
        toast.error(error.data || error.data.message)
      }
   }
   return (
      <nav className="w-full sticky top-0 py-3 px-4 bg-[#07143F] text-gray-200 z-50">
         <div className='flex max-w-5xl mx-auto flex-col gap-3 lg:flex-row justify-between z-10'>
            <div className="flex justify-between items-center">
               <h1>
                  <span className='bg-gradient-to-r from-[#FAB440] to-[#4E47C6] text-lg md:text-2xl font-bold py-0.5 px-2 rounded-lg'>
                     Train-Trip
                  </span>
               </h1>
               {userInfo ? (
                  <div className="relative flex gap-4 lg:hidden">
                     <div className="rounded-full w-10 h-10 overflow-hidden">
                        <img onClick={expandMenu} className="w-full h-fit rounded-full object-contain" src={userInfo?.image || ProfileImage} alt='profile' />
                     </div>
                     <div className={`text-black absolute ${expand ? "opacity-1 flex" : "opacity-0 hidden"} text-gray-800 transition-all flex-col gap-1 w-48 bg-white top-full right-0 rounded-lg shadow p-4`}>
                        <Link onClick={expandMenu} className="flex items-center gap-2" to={`/profile`}><FaUserCog size={24} /> Mon Profile</Link>
                        {userInfo && userInfo.isAdmin && <Link onClick={expandMenu} className="flex items-center gap-2" to={`/admin/dashboard`}><MdAdminPanelSettings size={24} /> Administration</Link>}
                        <Link onClick={logoutHandler} className="flex items-center gap-2"><MdLogout size={24}/> Se deconnecter</Link>
                     </div>
                     <NotifButton />
                  </div>
               ) : (
                  <div className="relative lg:hidden">
                     <button className="outline_btn" onClick={() => navigate('/login')}>Se connecter</button>   
                  </div>
               )}
            </div>
            <div className="flex gap-4 text-medium justify-between font-semibold">
               <NavLink to={'/'} className='flex items-center gap-2'>
                  <FaHome className='h-8 w-8 sm:h-6 sm:w-6'/>
                  <span className="hidden sm:inline">Acceuil</span>
               </NavLink>
               {userInfo && <>
                  <NavLink to={'/trip'} className='flex items-center gap-2'>
                     <MdTravelExplore className="h-8 w-8 sm:h-6 sm:w-6"/>
                     <span className="hidden sm:inline">Voyage</span>
                  </NavLink>
                  <NavLink to={'/trip-proposition'} className='flex items-center gap-2'>
                     <GiHiveMind className="h-8 w-8 sm:h-6 sm:w-6"/>
                     <span className="hidden sm:inline">Advice</span>
                  </NavLink>
                  <NavLink to={'/contact'} className='flex items-center gap-2'>
                     <MdContactPhone className="h-8 w-8 sm:h-6 sm:w-6"/>
                     <span className="hidden sm:inline">Contact</span>
                  </NavLink>
               </>}
               
               <NavLink to={'/info-politics'} className='flex items-center gap-2'>
                  <MdContactSupport className="h-8 w-8 sm:h-6 sm:w-6"/>
                  <span className="hidden sm:inline">About</span>
               </NavLink>
            </div>
            {userInfo ? (
               <div className="hidden lg:flex gap-4 items-center">
                  <div onClick={expandMenu} className='relative px-4 py-1 rounded-full border lg:flex items-center gap-4'>
                     <div className="flex flex-row gap-2 items-center ">
                        <div className="rounded-full w-10 h-10 overflow-hidden">
                           <img onClick={expandMenu} className="w-full h-fit rounded-full object-contain" src={userInfo?.image || ProfileImage} alt='profile' />
                        </div>
                        <h4 className="font-semibold ">{userInfo?.username}</h4>
                     </div>
                     <span><FaCaretDown /></span>
                     <div className={`text-black absolute ${expand ? "opacity-1 flex" : "opacity-0 hidden"} text-gray-800 transition-all flex-col gap-1 w-full bg-white top-full right-0 rounded-lg shadow p-4`}>
                        <Link onClick={expandMenu} className="flex items-center gap-2" to={`/profile`}><FaUserCog size={24} /> Mon Profile</Link>
                        {userInfo && userInfo.isAdmin && <Link onClick={expandMenu} className="flex items-center gap-2" to={`/admin/dashboard`}><MdAdminPanelSettings size={24} /> Administration</Link>}
                        <Link onClick={logoutHandler} className="flex items-center gap-2"><MdLogout size={24} /> Se deconnecter</Link>
                     </div>
                  </div>
                  <NotifButton />
               </div>
            ) : (
               <div className="hidden lg:block">
                  <button className="outline_btn" onClick={() => navigate('/login')}>Se connecter</button>   
               </div>
            )}
         </div>
      </nav>
   )
}

export default Header