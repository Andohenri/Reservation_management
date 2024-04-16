import React, { useEffect, useState } from 'react'
import { FaRegClock, FaTimes } from 'react-icons/fa';
import { MdCall, MdPayment } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetMyNotificationsQuery } from '../redux/api/notificationApiSlice';
import { setNotifExpand, setNotification } from '../redux/features/notif/notifSlice';
import socket from '../utils/socket';
import { subtract } from '../utils/utils';

const NotificationSidebar = () => {
   const [paginationQuery, setPaginationQuery] = useState({
      pageSize: 10,
      pageNumber: 1
   })
   const { data, isLoading, refetch, error } = useGetMyNotificationsQuery(paginationQuery);
   const { notifExpand, notifications, notification } = useSelector(state => state.notif);
   const dispatch = useDispatch();

   const showNotif = () => {
      dispatch(setNotifExpand(notifExpand))
   }

   const fetch = async () => {
      await refetch()
   }

   const handleNextPage = async () => {
      setPaginationQuery(prev => ({ ...prev, pageSize: prev.pageSize + 10 }))
      // fetch()
   }

   useEffect(() => {
      fetch()
   }, [notifExpand])

   useEffect(() => {
      socket.on('receive notification', (notification) => {
         if (!notifications.find(obj => Object.values(obj).includes(notification._id))) {
            dispatch(setNotification(notification));
            console.log("Message recu", notification._id);
         }
      })
   }, [socket])


   return (
      <div className={`fixed flex flex-col top-0 h-screen w-full sm:w-2/3 lg:w-1/3 bg-gradient-to-tl from-white/10 to-[#FFF] backdrop-blur-lg z-10 pr-4 pt-6 transition-all ${notifExpand ? 'right-0' : '-right-full'}`}>
         <div className='flex mt-24 p-4 lg:mt-14 mb-4 justify-between'>
            <h1 className='head_text'>Notifications</h1>
            <button onClick={showNotif}><FaTimes /></button>
         </div>
         <div className='h-fit overflow-auto flex-1 flex flex-col'>
            {!isLoading ? data?.notifications?.length > 0 ? (<>
               {data?.notifications?.map(notif => (
                  <Link key={notif._id} onClick={showNotif} to={notif.trip ? `/trip/${notif.tripId}` : `/reservation-management`} className={`p-4 ${!notif.isRead ? 'bg-gradient-to-tl from-white/10 to-[] backdrop-blur-lg' : 'border-b py-4' }`}>
                     {notif.type === 'paymentReminder' ? <MdPayment /> : <MdCall/>}
                     <p>{notif.message}</p>
                     <p className='text-gray-600 text-base flex items-center gap-2'><FaRegClock/> <span>{subtract(0, notif.createdAt).fromNow()}</span></p>
                  </Link>
               ))}
               {data.isNext && <button onClick={handleNextPage} className='bg-[#07143F] rounded p-2 w-full text-white text-lg font-semibold uppercase'>Voir plus</button>}
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