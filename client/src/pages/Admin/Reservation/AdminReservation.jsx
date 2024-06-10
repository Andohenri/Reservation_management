import React, { useEffect, useState } from 'react'
import { FaCaretDown, FaPlus, FaTimes } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../../components/SearchBar'
import { useCancelledReservationMutation, useGetAllReservationQuery } from '../../../redux/api/reservationApiSlice'
import { subtract } from '../../../utils/utils';
import { toast } from 'react-toastify';
import socket from '../../../utils/socket'
import { useSendNotificationMutation } from '../../../redux/api/notificationApiSlice'
import MessageInfo from '../../../components/MessageInfo'
import ButtonDelete from '../../../components/ButtonDelete'

const AdminReservation = () => {
  const { data, isLoading, refetch } = useGetAllReservationQuery()
  const [cancelledReservation] = useCancelledReservationMutation()
  const [sendNotification] = useSendNotificationMutation()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [reservations, setReservations] = useState([])
  const [reservationsFiltered, setReservationsFiltered] = useState([])

  useEffect(() => {
    refetch()
    setReservations(data)
    setReservationsFiltered(data)
  }, [data, refetch])

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    if (!search) {
      return setReservationsFiltered(data);
    }
    const filtered = reservations.filter(res => res.user.username.toLowerCase().includes(search) || res.trip.destination.toLowerCase().includes(search) || res.trip.origin.toLowerCase().includes(search))
    if (filtered.length) {
      setReservationsFiltered(filtered)
    } else {
      setReservationsFiltered(data)
    }
  }

  const handleFilter = (e) => {
    setFilter(e.target.value);
    const filtered = e.target.value === "paid" ? reservations.filter(res => res.isPaid) : e.target.value === "nopaid" ? reservations.filter(res => !res.isPaid) : data
    if (filtered.length) {
      setReservationsFiltered(filtered)
    } else {
      setReservationsFiltered(data)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Etes-vous sûr de vouloir annuler ce réservation?')) {
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
      const res = await sendNotification({ recipientId: userId, type: 'paymentReminder', reservation: reservationId }).unwrap();
      socket.emit("send notification", { userId, content: res });
      toast.success("Notification envoyé")
    } catch (error) {
      toast.error(error?.data?.message || error?.message || error);
    }
  }

  return (
    <section>
      <div className='flex justify-between items-center pb-5 w-[88%] xl:w-full'>
        <h1 className='head_text'>Reservations</h1>
        <div className='flex gap-4'>
          <div className='relative w-[150px]'>
            <select className='input_table' value={filter} onChange={handleFilter}>
              <option value="">Tout</option>
              <option value="paid">Payé</option>
              <option value="nopaid">Non payé</option>
            </select>
            <span className='absolute top-3 right-1 md:right-2 pointer-events-none'><FaCaretDown className='text-gray-800' /></span>
          </div>
          <SearchBar value={search} handleSearch={handleSearch} />
        </div>
      </div>
      {!isLoading ? reservationsFiltered?.length > 0 ? (
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
              {reservationsFiltered?.map(reservation => (
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
                    <ButtonDelete text={"Etes-vous sur de vouloir annuler ce reservation ?"} request={() => handleDelete(reservation._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <MessageInfo message={"Pas de résérvation."} />
      ) : (
        <MessageInfo message={"Chargement..."} />
      )}
    </section>
  )
}

export default AdminReservation