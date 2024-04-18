import React, { useEffect, useState } from 'react'
import { FaCalendarAlt, FaMapMarkerAlt, FaMapPin, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import TripCard from '../components/TripCard';
import { useGetTripsQuery } from '../redux/api/tripApiSlice'
import { setSearchQuery } from '../redux/features/trip/tripSlice';

const Trip = () => {
  const dispatch = useDispatch();
  const [trips, setTrips] = useState([]);
  const [dateDepart, setDateDepart] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const { query } = useSelector(state => state.trip);
  const { data, isLoading, refetch, error } = useGetTripsQuery(query);

  useEffect(() => {
    refetch();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery({ departure_date: dateDepart, origin, destination }));
  }

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
      <form onSubmit={handleSubmit} className='sm:flex gap-2 p-4 mx-auto sm:m-0'>
        <section className='mb-2 sm:m-0 grid gap-2 grid-cols-2 md:grid-cols-3'>
          <div className='relative'>
            <input className='w-full shadow border focus:border-[#4E47C6] rounded-full py-2 pl-3 pr-8 text-gray-700 focus:outline-none transition-all pointer-events-auto placeholder:italic' type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder='Ville de départ' />
            <span className='absolute top-3 right-3 pointer-events-none'><FaMapPin className='text-gray-400' /></span>
          </div>
          <div className='relative'>
            <input className='w-full shadow border focus:border-[#4E47C6] rounded-full py-2 pl-3 pr-8 text-gray-700 focus:outline-none transition-all pointer-events-auto placeholder:italic' type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Ville d'arrivé" />
            <span className='absolute top-3 right-3 pointer-events-none'><FaMapMarkerAlt className='text-gray-400' /></span>
          </div>
          <div className='relative hidden sm:block'>
            <input className='shadow border focus:border-[#4E47C6] rounded-full py-2 pl-3 pr-6 text-gray-700 leading-tight focus:outline-none transition-all pointer-events-auto placeholder:italic' type="date" value={dateDepart} onChange={(e) => setDateDepart(e.target.value)} />
          </div>
        </section>
        <div className='flex justify-end'>
          <button type='submit' className='bg-[#07143F] rounded-full text-white px-3 py-2 flex gap-2 items-center'>
            <FaSearch size={24} />
            <span className='font-semibold'>Rechercher</span>
          </button>
        </div>
      </form>
      {!isLoading ? sortedDateKey?.length > 0 ? (
        sortedDateKey?.map(dateKey => (
          <div key={dateKey} className='p-4'>
            <h1 className='font-extrabold text-2xl flex items-center gap-2 text-gray-800 px-4 py-2'><FaCalendarAlt /> {dateKey}</h1>
            <div className='grid gap-2 sm:grid-cols-2'>
              {groupedTrips[dateKey].map(trip => (
                <TripCard key={trip._id} trip={trip} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <section className='flex justify-center'>
          <h1>Pas de voyages disponibles</h1>
        </section>
      ) : (
        <section className='flex justify-center'>
          <h1>Chargement...</h1>
        </section>
      )}
    </section>
  )
}

export default Trip