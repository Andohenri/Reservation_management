import React, { useEffect, useState } from 'react'
import { FaCalendarAlt } from 'react-icons/fa';
import TripCard from '../components/TripCard';
import { useGetTripsQuery } from '../redux/api/tripApiSlice'

const Trip = () => {
  const [trips, setTrips] = useState([]);
  const { data, isLoading, refetch, error } = useGetTripsQuery();

  useEffect(() => {
    refetch()
  }, [])
  

  useEffect(() => {
    setTrips(data)
  }, [data])

  const groupedTrips = trips?.reduce((acc, trip) => {
    const date = new Date(trip.departure_date);
    const dateKey = date.toDateString()
    acc[dateKey] = acc[dateKey] || [];
    acc[dateKey].push(trip);
    return acc;
  }, [])

  const sortedDateKey = groupedTrips && Object.keys(groupedTrips)?.sort((a, b) => {
    const firstDate = new Date(a)
    const secondDate = new Date(b)
    return firstDate - secondDate;
  })

  return (
    <section className='max-w-5xl mx-auto'>
      {!isLoading ? (
        sortedDateKey?.map(dateKey => (
          <div key={dateKey} className='p-4'>
            <h1 className='font-extrabold text-2xl flex gap-4 items-center text-gray-800 px-4 py-2'><FaCalendarAlt /> {dateKey}</h1>
            <div className='flex gap-2 flex-wrap w-full'>
              {groupedTrips[dateKey].map(trip => (
                <TripCard key={trip._id} trip={trip}/>
              ))}
            </div>
          </div>
        ))
      ) : (
        <section className='flex justify-center'>
          <h1>Chargement...</h1>
        </section>
      )}
    </section>
  )
}

export default Trip