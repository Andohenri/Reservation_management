import React, { useEffect, useState } from 'react'
import { useGetAllTripsQuery, useUpdateTripCancelledMutation, useUpdateTripCompletedMutation, useUpdateTripInProgressMutation } from '../../../redux/api/tripApiSlice';
import { FaCaretDown, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar';
import { toast } from 'react-toastify';
import { subtract } from '../../../utils/utils';

const AdminTrip = () => {
  const [trips, setTrips] = useState([])
  const [search, setSearch] = useState('')
  const {data, isLoading, refetch} = useGetAllTripsQuery();
  const [updateToInProgress] = useUpdateTripInProgressMutation();
  const [updateToCompleted] = useUpdateTripCompletedMutation();
  const [updateToCancelled] = useUpdateTripCancelledMutation();
  const navigate = useNavigate()
  
  const handleSearch = (e) => {
    // TODO
    setSearch(e.target.value)
  }
  useEffect(() => {
    refetch()
    setTrips(data)
  }, [data, refetch])

  const handleDelete = async (id) => {
    if(window.confirm('Etes-vous sûr de vouloir supprimer ce train?')){
      try {
        await deleteTrain(id).unwrap()
        toast.success("Le train a été supprimer.")
        await refetch()
      } catch (error) {
        toast.success(error || error.message || error.data.message)
      }
    }
  }
  const handleChange = (id) => async (e) => {
    try {
      if(e.target.value === 'in progress'){
        await updateToInProgress(id).unwrap()
        toast.info("Ce voyage est maintenant en cours")
      }else if(e.target.value === 'completed'){
        await updateToCompleted(id).unwrap()
        toast.info("Ce voyage est bien arrivé à destination")
      }else if(e.target.value === 'cancelled'){
        await updateToCancelled(id).unwrap()
        toast.info("En raison des problèmes, ce voyage a été annuler")
      }
    } catch (error) {
      toast.error(error)
    } finally {
      await refetch()
    }
  } 

  return (
    <section>
      <div className='flex justify-between items-center pb-5 w-[88%] 3xl:w-full'>
        <h1 className='head_text'>Voyages</h1>
        <div className='flex gap-4'>
          <SearchBar value={search} handleSearch={handleSearch}/>
          <button onClick={() => navigate(`new`)} className='btn_primary flex gap-2 items-center uppercase'><FaPlus size={24}/><span className='hidden sm:block'>Ajouter</span></button>
        </div>
      </div>
      { !isLoading ? <div className="shadow-inner h-[32rem] overflow-x-scroll w-[88%] 3xl:w-full">
        <table className="table-auto w-full divide-y divide-gray-500">
          <thead>
            <tr>
              <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Train</th>
              <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Origine</th>
              <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Départ</th>
              <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Déstination</th>
              <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Arrivé</th>
              <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Place dispo.</th>
              <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Prix</th>
              <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Status</th>
              <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'></th>
              <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'></th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {trips?.map(trip => (
              <tr key={trip._id}>
                <td className="px-6 py-3">{trip.trainId?.name}</td>
                <td className="px-6 py-3">{trip.origin}</td>
                <td className="px-6 py-3">{subtract(3, trip.departure_date).fromNow()}</td>
                <td className="px-6 py-3">{trip.destination}</td>
                <td className="px-6 py-3">{subtract(3, trip.arrival_date).fromNow()}</td>
                <td className="px-6 py-3">{trip.avalaible_seats}</td>
                <td className="px-6 py-3">{trip.price}</td>
                <td className="px-6 py-3">
                  <div className='relative w-[100px]'>
                    <select className='input_table' value={trip.status} onChange={handleChange(trip._id)}>
                      <option value="pending">En attente</option>
                      <option value="in progress">En cours</option>
                      <option value="completed">Términé</option>
                      <option value="cancelled">Annuler</option>
                    </select>
                    <span className='absolute top-3 right-1 md:right-2 pointer-events-none'><FaCaretDown className='text-gray-800'/></span>
                  </div>
                </td>
                <td className="px-6 py-3">
                  <button onClick={() => navigate(`/admin/trips/${trip._id}`)} className="transition-all bg-[#FAB440] hover:bg-[#FAB440] px-4 py-2 rounded text-white">
                    <FaEdit />
                  </button>
                </td>
                <td className="px-6 py-3">
                  <button onClick={() => handleDelete(trip._id)} className="transition-all bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
      </div> : 
      <section className='flex justify-center'>
        <h1>Loading...</h1>
      </section> }
    </section>
  )
}

export default AdminTrip