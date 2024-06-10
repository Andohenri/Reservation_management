import React, { useEffect, useState } from 'react'
import { useDeleteTripMutation, useGetAllTripsQuery, useUpdateTripCancelledMutation, useUpdateTripCompletedMutation, useUpdateTripInProgressMutation } from '../../../redux/api/tripApiSlice';
import { FaCaretDown, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar';
import { toast } from 'react-toastify';
import { subtract } from '../../../utils/utils';
import MessageInfo from '../../../components/MessageInfo';
import ButtonDelete from '../../../components/ButtonDelete';

const AdminTrip = () => {
  const [trips, setTrips] = useState([])
  const [tripsFiltered, setTripsFiltered] = useState([])
  const [search, setSearch] = useState('')
  const { data, isLoading, refetch } = useGetAllTripsQuery();
  const [deleteTrip] = useDeleteTripMutation();
  const [updateToInProgress] = useUpdateTripInProgressMutation();
  const [updateToCompleted] = useUpdateTripCompletedMutation();
  const [updateToCancelled] = useUpdateTripCancelledMutation();
  const navigate = useNavigate();

  useEffect(() => {
    refetch()
    setTrips(data)
    setTripsFiltered(data)
  }, [data, refetch])

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    if (!search) {
      return setTripsFiltered(data);
    }
    const filtered = trips.filter(trip => trip.origin.toLowerCase().includes(search) || trip.destination.toLowerCase().includes(search))
    if (filtered.length) {
      setTripsFiltered(filtered)
    } else {
      setTripsFiltered(data)
    }
  }



  const handleDelete = async (id) => {
    try {
      await deleteTrip(id).unwrap();
      toast.success("Le voyage a été supprimer.");
      await refetch();
    } catch (error) {
      toast.error(error?.data?.message || error?.message || error);
    }
  }
  const handleChange = (id) => async (e) => {
    try {
      if (e.target.value === 'in progress') {
        await updateToInProgress(id).unwrap()
        toast.info("Ce voyage est maintenant en cours")
      } else if (e.target.value === 'completed') {
        await updateToCompleted(id).unwrap()
        toast.info("Ce voyage est bien arrivé à destination")
      } else if (e.target.value === 'cancelled') {
        await updateToCancelled(id).unwrap()
        toast.info("En raison des problèmes, ce voyage a été annuler")
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.message || error);
    } finally {
      await refetch()
    }
  }

  return (
    <section>
      <div className='flex justify-between items-center pb-5 w-[88%] xl:w-full'>
        <h1 className='head_text'>Voyages</h1>
        <div className='flex gap-4'>
          <SearchBar value={search} handleSearch={handleSearch} />
          <button onClick={() => navigate(`new`)} className='button_primary lg:mr-10 uppercase'><FaPlus size={24} /><span className='hidden sm:block'>Ajouter</span></button>
        </div>
      </div>
      {!isLoading ? tripsFiltered?.length > 0 ? (
        <div className="shadow-inner h-[32rem] overflow-x-scroll w-[88%] xl:w-full">
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
              {tripsFiltered?.map(trip => (
                <tr key={trip._id}>
                  <td className="px-6 py-3">{trip.trainId?.name}</td>
                  <td className="px-6 py-3">{trip.origin}</td>
                  <td className="px-6 py-3">{subtract(0, trip.departure_date).fromNow()}</td>
                  <td className="px-6 py-3">{trip.destination}</td>
                  <td className="px-6 py-3">{subtract(0, trip.arrival_date).fromNow()}</td>
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
                      <span className='absolute top-3 right-1 md:right-2 pointer-events-none'><FaCaretDown className='text-gray-800' /></span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <button onClick={() => navigate(`/admin/trips/${trip._id}`)} className="transition-all bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white">
                      <FaEdit />
                    </button>
                  </td>
                  <td className="px-6 py-3">
                    <ButtonDelete text={"Etes-vous sur de vouloir supprimer ce voyage ?"} request={() => handleDelete(trip._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <MessageInfo message={"Pas de voyage."} />
      ) : (
        <MessageInfo message={"Chargement..."} />
      )}
    </section>
  )
}

export default AdminTrip