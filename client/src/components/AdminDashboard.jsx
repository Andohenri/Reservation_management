import React, { useEffect } from 'react'
import { FaUsers } from 'react-icons/fa'
import { IoMdTrain, IoMdAnalytics } from 'react-icons/io'
import { GiRailRoad } from 'react-icons/gi'
import { RiComputerFill } from 'react-icons/ri'
import { useSelector } from 'react-redux';
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useUpdateTripCompletedMutation, useUpdateTripInProgressMutation, useUpdateTripNotifSentMutation, useGetAllTripsQuery } from '../redux/api/tripApiSlice'
import { useSendNotificationMutation } from '../redux/api/notificationApiSlice.js'
import { subtract, uniqueArray } from '../utils/utils'
import socket from '../utils/socket'

const AdminDashboard = () => {
  const { userInfo } = useSelector(state => state.auth);
  const { data, refetch } = useGetAllTripsQuery();
  const [updateToInProgress] = useUpdateTripInProgressMutation();
  const [updateToCompleted] = useUpdateTripCompletedMutation();
  const [updateToNotifSent] = useUpdateTripNotifSentMutation();
  const [sendNotification] = useSendNotificationMutation();
  
  useEffect(() => {
    const interval = setInterval(async () => {
      await refetch();
    }, 60000);
  
    return () => {
      clearInterval(interval);
    }
  }, [])
  

  useEffect(() => {
    const interval = setInterval(async () => {
      data?.map(async (trip) => {
        const currentDate = subtract(0, new Date());
        const departure_date = subtract(0, new Date(trip.departure_date));
        const arrival_date = subtract(0, new Date(trip.arrival_date));
        if (currentDate.isBetween(departure_date, arrival_date) && trip.status !== 'in progress') {
          await updateToInProgress(trip._id).unwrap()
          await refetch();
        } else if (currentDate.isAfter(arrival_date) && trip.status !== 'completed') {
          await updateToCompleted(trip._id).unwrap();
          await refetch();
        }
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    }
  }, [data]);

  useEffect(() => {
    const interval1 = setInterval(() => {
      data?.map(async (trip) => {
        const currentDate = subtract(0, new Date());
        const departure_date = subtract(0, new Date(trip.departure_date));
        if (Math.abs(currentDate.diff(departure_date, 'hours')) <= 4 && !trip.isNotifSent) {
          const passenger = await uniqueArray(trip?.passenger);
          passenger.map(async (userId) => {
            const resnotif = await sendNotification({ recipientId: userId, type: 'tripReminder', trip: trip._id }).unwrap();
            socket.emit("send notification", { userId, content: resnotif });
          });
          await updateToNotifSent(trip._id).unwrap();
          await refetch();
        }
      });
    }, 5000);

    return () => {
      clearInterval(interval1);
    }
  }, [data])

  return (
    <main className='relative max-w-6xl mx-auto px-4 py-6'>
      <aside className='fixed top-24 p-2 flex flex-col gap-1 right-0 text-gray-800 font-semibold bg-gradient-to-tl from-white/10 to-white/50 backdrop-blur-lg shadow rounded'>
        <NavLink to={'/admin/dashboard'} className='flex mt-2 items-center gap-2'>
          <IoMdAnalytics className='h-8 w-8 sm:h-6 sm:w-6' />
          <span className="hidden sm:inline">Dashboard</span>
        </NavLink>
        <NavLink to={'/admin/reservations'} className='flex mt-2 items-center gap-2'>
          <RiComputerFill className='h-8 w-8 sm:h-6 sm:w-6' />
          <span className="hidden sm:inline">Résérvations</span>
        </NavLink>
        <NavLink to={'/admin/trips'} className='flex mt-2 items-center gap-2'>
          <GiRailRoad className='h-8 w-8 sm:h-6 sm:w-6' />
          <span className="hidden sm:inline">Voyages</span>
        </NavLink>
        <NavLink to={'/admin/trains'} className='flex mt-2 items-center gap-2'>
          <IoMdTrain className='h-8 w-8 sm:h-6 sm:w-6' />
          <span className="hidden sm:inline">Trains</span>
        </NavLink>
        <NavLink to={'/admin/users'} className='flex mt-2 items-center gap-2'>
          <FaUsers className='h-8 w-8 sm:h-6 sm:w-6' />
          <span className="hidden sm:inline">Clients</span>
        </NavLink>
      </aside>
      <div>
        {userInfo && userInfo.isAdmin ? (
          <Outlet />
        ) : (
          <Navigate to={'/login'} />
        )}
      </div>
    </main>
  )
}

export default AdminDashboard