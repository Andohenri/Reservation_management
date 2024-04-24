import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Footer from './components/Footer'
import Header from './components/Header'
import NotificationSidebar from './components/NotificationSidebar';
import { setNotification } from './redux/features/notif/notifSlice';
import socket from './utils/socket';

export default function App() {
  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.auth);
  useEffect(() => {
    if(userInfo) {
      socket.connect();
      socket.emit('storeUserId', userInfo);
      socket.on('receive pending notification', data => {
        data.map(notification => {
          dispatch(setNotification(notification));
          console.log("12");
        })
      });
    }
    return () => {
      socket.off('receive pending notification');
    }
  }, [userInfo]);
  
  return (
    <>
      <div className='main'>
        <div className='gradient' />
      </div>
      <main className='relative min-h-screen flex flex-col'>
        <Header />
        <div className='w-full flex-1 z-10'>
          <Outlet />
        </div>
        <Footer />
      {userInfo && <NotificationSidebar />}
      </main>
      <ToastContainer />
    </>
  )
}
