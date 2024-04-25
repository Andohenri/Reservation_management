import React, { useEffect, useState } from 'react'
import { FaRegClock, FaSpeakap, FaTimes } from 'react-icons/fa';
import { MdPayment, MdTipsAndUpdates } from 'react-icons/md';
import { SlOptionsVertical } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetMyNotificationsQuery } from '../redux/api/notificationApiSlice';
import { resetState, setNotifExpand, setNotification } from '../redux/features/notif/notifSlice';
import socket from '../utils/socket';
import { subtract } from '../utils/utils';

const NotificationSidebar = () => {
   const [paginationQuery, setPaginationQuery] = useState({
      pageSize: 10,
      pageNumber: 1
   })
   const { data, isLoading, refetch, error } = useGetMyNotificationsQuery(paginationQuery);
   const { notifExpand } = useSelector(state => state.notif);
   const dispatch = useDispatch();

   const showNotif = () => {
      dispatch(setNotifExpand(notifExpand))
   }
   const fetch = async () => {
      await refetch()
   }
   const handleNextPage = async () => {
      setPaginationQuery(prev => ({ ...prev, pageSize: prev.pageSize + 10 }))
   }
   const showOptions = () => {
      setOption(prev => !prev);
   }

   useEffect(() => {
      if (notifExpand === true) {
         fetch();
      }
      const timeout = setTimeout(() => {
         dispatch(resetState());
      }, 2000);
      return () => clearTimeout(timeout);
   }, [notifExpand])

   useEffect(() => {
      socket.on('receive notification', (notification) => {
         dispatch(setNotification(notification));
         if(notifExpand) fetch();
      })
      return () => {
         socket.off('receive notification');
      }
   }, [socket])


   return (
      <div className={`fixed flex flex-col top-0 h-screen w-full sm:w-2/3 lg:w-1/3 bg-gradient-to-tl from-white/10 to-[#FFF] backdrop-blur-lg z-10 pt-6 transition-all ${notifExpand ? 'right-0' : '-right-full'}`}>
         <div className='flex mt-24 p-4 lg:mt-14 mb-2 justify-between'>
            <h1 className='head_text'>Notifications</h1>
            <button onClick={showNotif}><FaTimes /></button>
         </div>
         <div className='h-fit overflow-auto flex-1 flex flex-col'>
            {!isLoading ? data?.notifications?.length > 0 ? (
               <>
                  {data?.notifications?.map(notif => (
                     <div key={notif._id} className={`p-4 ${!notif.isRead ? 'bg-gradient-to-tl from-white/10 to-[] backdrop-blur-lg' : 'border-b py-4'}`}>
                        <div className='relative flex_between'>
                           {notif.type === 'paymentReminder' ? <MdPayment size={24} /> : notif.type === 'tripUpdat' ? <MdTipsAndUpdates size={24} /> : <FaSpeakap size={24} />}
                           <span onClick={showOptions} className='cursor-pointer'><SlOptionsVertical /></span>
                           {/* <div className={`${option ? 'flex flex-col gap-2' : 'hidden'} absolute bg-white top-0 right-4`}>
                              <h1>Supprimer</h1>
                           </div> */}
                        </div>
                        <Link onClick={showNotif} to={`/reservation-management`}>
                           <p>{notif.message}</p>
                        </Link>
                        <p className='text-gray-600 text-base flex items-center gap-2'><FaRegClock /> <span>{subtract(0, notif.createdAt).fromNow()}</span></p>
                     </div>
                  ))}
                  <div className='px-2 py-4'>
                     {data.isNext && <button onClick={handleNextPage} className='bg-[#07143F]  rounded p-2 w-full text-white text-lg font-semibold uppercase'>Voir plus</button>}
                  </div>
               </>
            ) : (
               <div className='flex justify-center'>
                  <h1>Aucune notification</h1>
               </div>
            ) : (
               <div className='flex justify-center'>
                  <h1>Chargement...</h1>
               </div>
            )}

         </div>
      </div>
   )
}

export default NotificationSidebar