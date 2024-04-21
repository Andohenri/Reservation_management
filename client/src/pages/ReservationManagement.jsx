import React from 'react'
import { FaHourglassEnd, FaTimes } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md'
import { toast } from 'react-toastify';
import { useCancelledReservationMutation, useGetMyReservationsQuery, usePayReservationMutation } from '../redux/api/reservationApiSlice'
import { subtract } from '../utils/utils';

const ReservationManagement = () => {
  const {data: reservations, isLoading, refetch, error} = useGetMyReservationsQuery();
  const [cancelledReservation, {isLoading: loading}] = useCancelledReservationMutation();
  const [payReservation, {isLoading: loadingPay}] = usePayReservationMutation();

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
  const handlePay = async (id) => {
    try {
      const res = await payReservation(id).unwrap()
      toast.success("Le payement a été éffectuer avec succès");
      await refetch();
      //PDF geanerating
    } catch (error) {
      toast.error(error?.data?.message || error?.message || error);
    }
  }
  return (
    <section className='max-w-5xl mx-auto px-4 py-6'>
      <h1 className='head_text mb-6'>Tous mes réservations</h1>
      {!isLoading ? reservations?.length > 0 ? (
        <div className="shadow-inner h-[32rem] overflow-x-scroll lg:overflow-hidden">
          <table className="table-auto w-full divide-y divide-gray-500 text-base lg:text-md">
            <thead>
              <tr>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Départ</th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Arrivée</th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Places</th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Prix total</th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Payé</th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Payé le</th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'></th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'></th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {reservations?.map(reservation => (
                <tr key={reservation._id}>
                  <td className="px-6 py-3"><span className='block'>{reservation?.trip?.origin}</span> le <span>{subtract(3, reservation?.trip?.departure_date).format("LLL")}</span></td>
                  <td className="px-6 py-3"><span className='block'>{reservation?.trip?.destination}</span> le <span>{subtract(3, reservation?.trip?.arrival_date).format("LLL")}</span></td>
                  <td className="px-6 py-3">{reservation?.nbrTickets}</td>
                  <td className="px-6 py-3">Ar {reservation?.totalPrice}</td>
                  <td className="px-6 py-3">{reservation?.isPaid ? <span className='bg-green-500 py-1 px-4 rounded text-white uppercase font-bold'>Completé</span> : <span className='bg-cyan-500 py-1 px-4 rounded text-white uppercase font-bold whitespace-nowrap'>En attente</span>}</td>
                  <td className="px-6 py-3">{reservation?.isPaid ? subtract(0, reservation?.paidAt).format('LLL') : ''}</td>
                  <td className="px-6 py-3">
                    <button onClick={() => handlePay(reservation?._id)} className="transition-all bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white">
                      { loadingPay ? <FaHourglassEnd/> : <MdPayment /> }
                    </button>
                  </td>
                  <td className="px-6 py-3">
                    <button onClick={() => handleDelete(reservation?._id)} className="transition-all bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white">
                      { loading ? <FaHourglassEnd/> : <FaTimes /> }
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
          <h1>Chargement...</h1>
        </section>
      )}
    </section>
  )
}

export default ReservationManagement