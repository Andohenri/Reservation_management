import React, { useEffect, useRef, useState } from 'react'
import { FaCaretDown, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import { useDeleteTrainMutation, useGetAllTrainsQuery, useUpdateTrainAvalaibleMutation, useUpdateTrainInMaintenanceMutation, useUpdateTrainUnavalaibleMutation } from '../../../redux/api/trainApiSlice.js'
import { toast } from 'react-toastify';
import SearchBar from '../../../components/SearchBar.jsx';
import MessageInfo from '../../../components/MessageInfo.jsx';
import ButtonDelete from '../../../components/ButtonDelete.jsx';

const AdminTrain = () => {
  const [trains, setTrains] = useState([])
  const [trainsFiltered, setTrainsFiltered] = useState([])
  const [search, setSearch] = useState('')

  const ref = useRef()

  const navigate = useNavigate()
  const { data, isLoading, refetch } = useGetAllTrainsQuery();
  const [updateToAvalaible] = useUpdateTrainAvalaibleMutation()
  const [updateToUnavalaible] = useUpdateTrainUnavalaibleMutation()
  const [updateToInMaintenance] = useUpdateTrainInMaintenanceMutation()
  const [deleteTrain] = useDeleteTrainMutation()

  useEffect(() => {
    setTrains(data)
    setTrainsFiltered(data)
  }, [data])

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    if (!search) {
      return setTrainsFiltered(data);
    }
    const filtered = trains.filter(train => train.name.toLowerCase().includes(search) || train.type.toLowerCase().includes(search))
    if (filtered.length) {
      setTrainsFiltered(filtered)
    } else {
      setTrainsFiltered(data)
    }
  }


  const handleDelete = async (id) => {
    try {
      await deleteTrain(id).unwrap()
      toast.success("Le train a été supprimer.")
      await refetch()
    } catch (error) {
      toast.error(error?.data?.message || error?.message || error);
    }
  }

  const handleChange = (id) => async (e) => {
    try {
      if (e.target.value === 'avalaible') {
        await updateToAvalaible(id).unwrap()
        toast.success("Ce train est maintenant disponible")
      } else if (e.target.value === 'unavalaible') {
        await updateToUnavalaible(id).unwrap()
        toast("Ce train va être temporairement indisponible")
      } else {
        await updateToInMaintenance(id).unwrap()
        toast.success("Ce train est en maintenance technique")
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
        <h1 className='head_text'>Trains</h1>
        <div className='flex gap-4'>
          <SearchBar value={search} handleSearch={handleSearch} />
          <button onClick={() => navigate(`new`)} className='button_primary lg:mr-10 uppercase'><FaPlus size={24} /><span className='hidden sm:block'>Ajouter</span></button>
        </div>
      </div>
      {!isLoading ? trainsFiltered?.length > 0 ? (
        <div className="shadow-inner h-[32rem] overflow-x-scroll lg:overflow-x-hidden w-[88%] xl:w-full">
          <table className="table-auto w-full divide-y divide-gray-500">
            <thead>
              <tr>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Nom</th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>type</th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Capacité</th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>statut</th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'></th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'></th>
                <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'></th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {trainsFiltered?.map(train => (
                <tr key={train._id}>
                  <td className="px-6 py-3">{train.name}</td>
                  <td className="px-6 py-3">{train.type}</td>
                  <td className="px-6 py-3">{train.capacity}</td>
                  <td className="px-6 py-3">{train.status}</td>
                  <td className="px-6 py-3">
                    <div className='relative'>
                      <select className='input_table' value={train.status} onChange={handleChange(train._id)} ref={ref}>
                        <option value="avalaible">Disponible</option>
                        <option value="unavalaible">Indisponiple</option>
                        <option value="maintenance">En Maintenance</option>
                      </select>
                      <span className='absolute top-3 right-1 md:right-2 pointer-events-none'><FaCaretDown className='text-gray-800' /></span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <button onClick={() => navigate(`/admin/trains/${train._id}`)} className="transition-all bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white">
                      <FaEdit />
                    </button>
                  </td>
                  <td className="px-6 py-3">
                    <ButtonDelete text={"Etes-vous sur de vouloir supprimer ce train ?"} request={() => handleDelete(train._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <MessageInfo message={"Pas de train disponible."} />
      ) : (
        <MessageInfo message={"Chargement..."} />
      )}
    </section>
  )
}

export default AdminTrain