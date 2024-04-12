import { IoIosNotifications } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { setNotifExpand } from '../redux/features/notif/notifSlice';

const NotifButton = () => {
   const { userInfo, socket } = useSelector(state => state.auth);
   const { notifExpand } = useSelector(state => state.notif);
   const dispatch = useDispatch();

   const showNotif = () => {
      dispatch(setNotifExpand(notifExpand));
   }
   return (<>
      {userInfo ? (
         <button className='relative' onClick={showNotif}>
            <IoIosNotifications className="h-8 w-8 sm:h-10 sm:w-10"/>
            <span className='absolute bg-blue-500 p-1 w-8 h-8 rounded-full -top-1 -right-3 font-bold'>3</span>
         </button>
      ) : (
         <></>
      )}
   </>)
}

export default NotifButton