import React, { useEffect, useState } from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../../components/SearchBar'
import { useCancelledReservationMutation, useGetAllReservationQuery } from '../../../redux/api/reservationApiSlice'
import { subtract } from '../../../utils/utils';
import { toast } from 'react-toastify';
import socket from '../../../utils/socket'
import { useSendNotificationMutation } from '../../../redux/api/notificationApiSlice'

const AdminReservation = () => {
  const {data, isLoading, refetch} = useGetAllReservationQuery()
  const [cancelledReservation] = useCancelledReservationMutation()
  const [sendNotification] = useSendNotificationMutation()

  const [search, setSearch] = useState('')
  const [reservations, setReservations] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const handleSearch = () => {

  }

  const handleDelete = async (id) => {
    if(window.confirm('Etes-vous sûr de vouloir annuler ce réservation?')){
      try {
        const res = await cancelledReservation(id).unwrap()
        toast.info("Le Reservation a été annuler.")
        await refetch()
      } catch (error) {
        toast.error(error?.data?.message || error?.message || error);
      }
    }
  }
  const sentNotification = async (reservationId, userId) => {
    try {
      const res = await sendNotification({recipientId: userId, type: 'paymentReminder', reservation: reservationId}).unwrap();
      socket.emit("send notification", {userId , content: res});
      toast.success("Notification envoyé")
    } catch (error) {
      toast.error(error?.data?.message || error?.message || error);
    }
  }
  useEffect(() => {
    setReservations(data)
  }, [data])
  
  return (
    <section>
      <div className='flex justify-between items-center pb-5 w-[88%] xl:w-full'>
        <h1 className='head_text'>Reservations</h1>
        <div className='flex gap-4'>
          <SearchBar value={search} handleSearch={handleSearch}/>
          <button onClick={() => navigate(`new`)} className='button_primary uppercase'>
            <FaPlus size={24}/><span className='hidden sm:block'>Ajouter</span>
          </button>
        </div>
      </div>
      {!isLoading ? reservations?.length > 0 ? (
        <div className="shadow-inner h-[32rem] overflow-x-scroll w-[88%] xl:w-full">
          <table className="table-auto w-full divide-y divide-gray-500">
            <thead>
              <tr>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Client</th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Départ</th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Arrivée</th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Places</th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Prix total</th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Payement</th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Rappel Payement</th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'></th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {reservations?.map(reservation => (
                <tr key={reservation._id}>
                  <td className="px-6 py-3">{reservation?.user?.username}</td>
                  <td className="px-6 py-3"><span className='block'>{reservation?.trip?.origin}</span><span>{subtract(3, reservation?.trip?.departure_date).fromNow()}</span></td>
                  <td className="px-6 py-3"><span className='block'>{reservation?.trip?.destination}</span><span>{subtract(3, reservation?.trip?.arrival_date).fromNow()}</span></td>
                  <td className="px-6 py-3">{reservation?.nbrTickets}</td>
                  <td className="px-6 py-3">Ar {reservation?.totalPrice}</td>
                  <td className="px-6 py-3">{reservation?.isPaid ? <span className='bg-green-500 py-1 px-4 rounded text-white uppercase font-bold'>Completé</span> : <span className='bg-cyan-500 py-1 px-4 rounded text-white uppercase font-bold whitespace-nowrap'>En attente</span>}</td>
                  <td className="px-6 py-3">
                    <button onClick={() => sentNotification(reservation?._id, reservation?.user?._id)} className="transition-all bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white">
                      <IoSend />
                    </button>
                  </td>
                  <td className="px-6 py-3">
                    <button onClick={() => handleDelete(reservation?._id)} className="transition-all bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white">
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> 
        </div>
      ) : (
        <section className='flex justify-center'>
          <h1>Pas de résérvations</h1>
        </section>
      ) : (
        <section className='flex justify-center'>
          <h1>Loading...</h1>
        </section>
      )}
    </section>
  )
}

export default AdminReservation