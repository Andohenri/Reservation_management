import React, { useEffect, useState } from 'react'
import { FaRegClock, FaTimes } from 'react-icons/fa';
import { MdBrowserUpdated, MdOutlineDelete, MdPayment, MdWarning } from 'react-icons/md';
import { SlOptionsVertical } from 'react-icons/sl';
import { RiSpeakFill } from 'react-icons/ri';
import { CgOptions } from 'react-icons/cg';
import { CiRead } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDeleteAllMyNotificationsMutation, useGetMyNotificationsQuery, useMarkAllMyNotificationsAsReadMutation } from '../redux/api/notificationApiSlice';
import { resetState, setNotifExpand, setNotification } from '../redux/features/notif/notifSlice';
import socket from '../utils/socket';
import { subtract } from '../utils/utils';
import { toast } from 'react-toastify';
import ModalConfirm from './ModalConfirm';
import MessageInfo from './MessageInfo';


const NotificationSidebar = () => {
   const [paginationQuery, setPaginationQuery] = useState({
      pageSize: 10,
      pageNumber: 1
   });
   const [opt, setOpt] = useState(false);
   const { data, isLoading, refetch, error } = useGetMyNotificationsQuery(paginationQuery);
   const [markAllNotifAsRead] = useMarkAllMyNotificationsAsReadMutation();
   const [deleteAllMyNotifications, {isLoading: loading}] = useDeleteAllMyNotificationsMutation();
   const { notifExpand } = useSelector(state => state.notif);
   const dispatch = useDispatch();

   const [isOpen, setIsOpen] = useState(false);
   const openModal = () => setIsOpen(true);
   const closeModal = () => setIsOpen(false);

   const showNotif = () => {
      dispatch(setNotifExpand(notifExpand))
   }
   const fetch = async () => {
      await refetch()
   }
   const handleNextPage = async () => {
      setPaginationQuery(prev => ({ ...prev, pageSize: prev.pageSize + 10 }))
   }
   const showOpt = () => {
      setOpt(prev => !prev);
   }
   const markAsRead = async () => {
      try {
         await markAllNotifAsRead().unwrap();
         showOpt();
         fetch();
      } catch (error) {
         toast.error(error?.data?.message || error?.message || error);
      }
   }
   const deleteAllNotifications = async () => {
      try {
         await deleteAllMyNotifications().unwrap();
         showOpt();
         closeModal();
         fetch();
      } catch (error) {
         toast.error(error?.data?.message || error?.message || error);
      }
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
         if (notifExpand) fetch();
      })
      return () => {
         socket.off('receive notification');
      }
   }, [socket])


   return (
      <div id='notif' className={`fixed flex text-gray-800 flex-col top-0 h-screen w-full sm:w-2/3 lg:w-1/3 bg-gradient-to-tl from-white/10 to-[#FFF] backdrop-blur-lg z-10 pt-6 transition-all ${notifExpand ? 'right-0' : '-right-full'}`}>
         {isOpen &&
            <ModalConfirm
               text={"Etes-vous sur de supprimer touts les notifications ?"}
               icon={<MdWarning size={48} className='text-red-400' />}
               isLoading={loading}
               isOpen={isOpen}
               closeModal={closeModal}
               request={deleteAllNotifications}
            />
         }
         <div className='flex relative mt-24 p-4 lg:mt-14 mb-2 justify-between'>
            <h1 className='head_text flex items-center gap-2'>Notifications <span className='mt-2 cursor-pointer hover:bg-gray-200 rounded p-1 transition-all' onClick={showOpt}><CgOptions size={24} /></span></h1>
            <button onClick={showNotif}><FaTimes /></button>
            <div className={`${opt ? "absolute" : "hidden"} bg-white p-4 rounded top-full right-6 z-10 font-semibold shadow`}>
               <h4 onClick={markAsRead} className='px-2 py-1 hover:bg-gray-100 rounded cursor-pointer transition-all'><CiRead className='inline mb-1' /> Marquer comme lues</h4>
               <h4 onClick={openModal} className='px-2 py-1 hover:bg-gray-100 rounded cursor-pointer transition-all'><MdOutlineDelete className='inline mb-1' /> Supprimer tous les notifications</h4>
            </div>
         </div>

         <div className='h-fit overflow-auto flex-1 flex flex-col'>
            {!isLoading ? data?.notifications?.length > 0 ? (
               <>
                  {data?.notifications?.map(notif => (
                     <div key={notif._id} className={`p-4 ${!notif.isRead ? 'bg-gradient-to-tl from-white/10 to-[] backdrop-blur-lg' : 'border-b py-4'}`}>
                        <div className='relative flex_between'>
                           {notif.type === 'paymentReminder' ? <MdPayment size={24} /> : notif.type === 'tripUpdate' ? <MdBrowserUpdated size={24} /> : <RiSpeakFill size={24} />}
                           <span className='cursor-pointer hover:bg-gray-200 rounded py-1 transition-all'><SlOptionsVertical /></span>
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
               <MessageInfo message={"Aucune notification"} />
            ) : (
               <MessageInfo message={"Chargement..."} />
            )}

         </div>
      </div>
   )
}

export default NotificationSidebar