import React, { useState } from 'react'
import { FaExpand, FaExpandAlt, FaExpandArrowsAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifExpand } from '../redux/features/notif/notifSlice';
import socket from '../utils/socket';

const NotificationSidebar = () => {
   const {notifExpand} = useSelector(state => state.notif);
   const [notif, setNotif] = useState('')
   const dispatch = useDispatch();

   const showNotif = () => {
      dispatch(setNotifExpand(notifExpand))
   }
   socket.on('receive notification', ({content}) => {
      setNotif(content)
   })
   return (
      <div className={`fixed flex flex-col top-0 h-screen w-full sm:w-2/3 lg:w-1/3 bg-gradient-to-tl from-white/10 to-[#FFF] backdrop-blur-lg z-10 p-6 transition-all ${notifExpand ? 'right-0': '-right-full'}`}>
         <div className='flex mt-24 lg:mt-14 mb-4 justify-between'>
            <h1 className='head_text'>Notifications</h1>
            <button onClick={showNotif}><FaExpandArrowsAlt /></button>
         </div>
         <div className='h-fit overflow-auto flex-1'>
            <div className='border-b py-2'>
               <FaExpandAlt/>
               <p>{notif}</p>
               <span>il y a 2 minutes</span>
            </div>
            <div className='border-b py-2'>
               <FaExpandAlt/>
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt aspernatur quia perferendis quo sit autem similique iusto? Quos</p>
               <span>il y a 2 minutes</span>
            </div>
            <div className='border-b py-2'>
               <FaExpandAlt/>
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt aspernatur quia perferendis quo sit autem similique iusto? Quos</p>
               <span>il y a 2 minutes</span>
            </div>
         </div>
      </div>
   )
}

export default NotificationSidebar