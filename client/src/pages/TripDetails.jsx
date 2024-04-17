import React, { useState } from 'react'
import { FaArrowAltCircleRight, FaCaretDown, FaChair, FaRegClock, FaTicketAlt, FaTrain } from 'react-icons/fa'
import { WiTrain } from 'react-icons/wi'
import { MdAirlineSeatReclineNormal, MdMergeType } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { useGetTripQuery } from '../redux/api/tripApiSlice'
import { subtract } from '../utils/utils'
import { useMakeReservationMutation } from '../redux/api/reservationApiSlice'
import TripCard from '../components/TripCard'
import { toast } from 'react-toastify'

const TripDetails = () => {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1);
  const { data: trip, isLoading, refetch, error } = useGetTripQuery(id);
  const [makeReservation, {isLoading: loading}] =  useMakeReservationMutation()

  const handleSubmit = async  (e) => {
    e.preventDefault()
    try {
      const res = await makeReservation({trip: id, nbrTickets: quantity}).unwrap()
      await refetch()
      toast.success("La réservation a été placé avec succès");
    } catch (error) {
      toast.error(error?.data?.message || error?.message || error);
    }
  }
  return (
    <section className='max-w-4xl mx-auto p-6'>
      <h1 className='head_text mb-6'>Faire un réservation</h1>
      {!isLoading ? (
        <div className='p-4 shadow'>
          <div className='flex_between border-b pb-4'>
            <div className='flex_between gap-4 text font-semibold'>
              <img src="" alt="" className='w-14 h-14 rounded' />
              <div>
                <p className='flex_between gap-2'>{trip.trainId.name} <FaTrain/> </p>
                <p className='flex_between gap-2'> {trip.trainId.type} <MdMergeType/></p>
              </div>
            </div>
            <div className='flex gap-4 flex-col text'>
              <span className={`${trip.status === 'pending' ? 'bg-blue-200 text-blue-600' : trip.status === 'in progress' ? 'bg-yellow-200 text-yellow-600' : trip.status === 'cancelled' ? 'bg-red-200 text-red-600' : 'bg-green-200 text-green-600'} rounded-full p-2`}>{trip.status}</span>
              <p className='flex gap-2'><FaChair size={24}/> {trip.trainId.capacity}</p>
            </div>
          </div>
          <div className='p-4 flex flex-col gap-6 text'>
            <div className='flex_between text-gray-600'>
               <span className='flex_between gap-2'><FaArrowAltCircleRight/> {subtract(3, trip.departure_date).format("LL")}</span>
               <span className='flex_between gap-2'><FaArrowAltCircleRight/> {subtract(3, trip.arrival_date).format("LL")}</span>
            </div>
            <div className='flex_between'>
               <span>{trip.origin}</span>
               <span>{trip.destination}</span>
            </div>
            <div className='flex_between gap-4 font-bold text-3xl'>
               <span className=''>{trip.origin.slice(0,3).toUpperCase()}</span>
               <span 
                className={`hidden sm:flex relative flex-1 ${trip.status === 'pending' ? 'justify-start' : trip.status === 'in progress' ? 'justify-center' : 'justify-end'} before:content-[""] before:absolute before:w-full before:bg-gray-800 before:h-0.5 before:bottom-0 before:z-0`}><WiTrain size={32} className='text-blue-500 z-10' /></span>
               <span className=''>{trip.destination.slice(0,3).toUpperCase()}</span>
            </div>
            <div className='flex_between text-gray-600 font-semibold'>
               <span className='flex_between gap-2'><FaRegClock /> {subtract(3, trip.departure_date).format("HH:mm")}</span>
               <span className='flex_between gap-2'><FaRegClock/> {subtract(3, trip.arrival_date).format("HH:mm")}</span>
            </div>
            <div className='flex_between text-gray-600 font-semibold'>
               <span className='flex_between gap-2'><FaTicketAlt size={24}/> $ {trip.price}</span>
               <span className='flex_between gap-2'><MdAirlineSeatReclineNormal size={24}/> {trip.avalaible_seats}</span>
            </div>
            {trip.status !== 'completed' || trip.status !== 'cancelled' ? (
              <form onSubmit={handleSubmit} className='flex_between'>
                {trip.avalaible_seats > 0 && (
                  <div className='relative w-[100px]'>
                    <select className='input_table' value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                      {[...Array(trip.avalaible_seats).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))}
                    </select>
                    <span className='absolute top-3 right-1 md:right-2 pointer-events-none'><FaCaretDown className='text-gray-800'/></span>
                  </div>
                )}
                <button type='submit' className='bg-[#FAB440] hover:bg-[#ffa616] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>{!loading ? 'Placer la réservation': 'Chargement...'}</button>
              </form>
            ) : (
              <></>
            )}
            
          </div>
        </div>
      ) : (
        <section className='flex justify-center'>
          <p>Chargement...</p>
        </section>
      )}
    </section>
  )
}

export default TripDetails