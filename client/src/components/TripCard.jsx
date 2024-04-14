import React from 'react'
import { setSatus, subtract } from '../utils/utils'
import { FaArrowAltCircleRight, FaTicketAlt } from 'react-icons/fa';
import { WiTrain } from 'react-icons/wi';
import { useNavigate } from 'react-router-dom';

const TripCard = ({trip}) => {
   const navigate = useNavigate();
   return (
      <section className='bg-white w-[49%] mb-4 rounded text-gray-800 shadow'>
         <div className='flex_between p-4'>
            <div className='flex_between gap-4'>
               <img src={''} alt="" className='rounded w-10 h-10'/>
               <div className='flex flex-col gap-2'>
                  <h1>{trip.trainId?.name}</h1>
                  <h5>{trip.trainId?.type}</h5>
               </div>
            </div>
            <div>
               <span className={`${trip.status === 'pending' ? 'bg-blue-200 text-blue-600' : trip.status === 'in progress' ? 'bg-yellow-200 text-yellow-600' : trip.status === 'cancelled' ? 'bg-red-200 text-red-600' : 'bg-green-200 text-green-600'} rounded-full p-2`}>{setSatus(trip.status)}</span>
            </div>
         </div>
         <div className='flex flex-col gap-1 p-4 border-y'>
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
                  className={`relative flex-1 flex ${trip.status === 'pending' ? 'justify-start' : trip.status === 'in progress' ? 'justify-center' : 'justify-end'} before:content-[""] before:absolute before:w-full before:bg-gray-800 before:h-0.5 before:top-[50%] before:z-0`}
               >
                  <WiTrain className='bg-white z-10' />
               </span>
               <span className=''>{trip.destination.slice(0,3).toUpperCase()}</span>
            </div>
            <div className='flex_between text-gray-600 font-semibold'>
               <span className='flex_between gap-2'>{subtract(3, trip.departure_date).format("HH:mm")}</span>
               <span className='flex_between gap-2'>{subtract(3, trip.arrival_date).format("HH:mm")}</span>
            </div>
         </div>
         <div className='flex_between p-4'>
            <div className='flex gap-2 items-center'>
               <FaTicketAlt size={24} className='text-[#FAB440]' />
               <p>Prix d'un billet</p>
            </div>
            <span className='text-[#07143F] font-bold text-2xl'>Ar {trip.price}</span>
         </div>
         <div className='px-4 flex justify-end'>
            <button onClick={() => navigate(`${trip._id}`)} className='btn_primary mb-4'>Voir plus...</button>
         </div>
      </section>
   )
}

export default TripCard