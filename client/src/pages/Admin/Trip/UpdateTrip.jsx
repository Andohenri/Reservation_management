import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormTrip from '../../../components/FormTrip'
import { useGetTripQuery, useUpdateTripMutation } from '../../../redux/api/tripApiSlice'
import { subtract } from '../../../utils/utils'

const UpdateTrip = () => {
  const navigate = useNavigate()
  const [tripForm, setTripForm] = useState({})
  const { id: tripId } = useParams()
  const { data: trip } = useGetTripQuery(tripId);

  const [update, {isLoading, error}] = useUpdateTripMutation()

  useEffect(() => {
      setTripForm({
        trainId: trip?.trainId._id,
        departure_date: subtract(3, trip?.departure_date).format('YYYY-MM-DD'),
        hour_dep: subtract(3, trip?.departure_date).format('HH:mm'),
        arrival_date: subtract(3, trip?.arrival_date).format('YYYY-MM-DD'),
        hour_arr: subtract(3, trip?.arrival_date).format('HH:mm'),
        origin: trip?.origin,
        destination: trip?.destination,
        price: trip?.price
      })
  }, [trip, isLoading])
  

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const res = await update({ data: tripForm, tripId }).unwrap();
      if(res.message) throw Error(res.message);
      toast.success("Le voyage a été modifié avec succès");
      navigate('/admin/trips');
    } catch (err) {
      toast.error(err || err.message || err.data.message || error)
    }
  }
  const handleChange = (e) => {
    setTripForm({...tripForm, [e.target.id]: e.target.value});
  }
  return (
    <section className='px-4 py-6 mx-auto max-w-xl'>
        <FormTrip 
          loading={isLoading}
          handleUpdate={handleUpdate}
          handleChange={handleChange}
          tripForm={tripForm}
          setTripForm={setTripForm}
        />
    </section>
  )
}

export default UpdateTrip