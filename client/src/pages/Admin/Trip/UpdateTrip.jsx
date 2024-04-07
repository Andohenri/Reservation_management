import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormTrip from '../../../components/FormTrip'
import { useGetTripQuery, useUpdateTripMutation } from '../../../redux/api/tripApiSlice'

const UpdateTrip = () => {
  const navigate = useNavigate()
  const [tripForm, setTripForm] = useState({})
  const { id: tripId } = useParams()
  const { data: trip } = useGetTripQuery(tripId);

  const [update, {isLoading, error}] = useUpdateTripMutation()

  useEffect(() => {
      setTripForm({
        trainId: trip?.trainId._id,
        departure_date: trip?.departure_date,
        arrival_date: trip?.arrival_date,
        origin: trip?.origin,
        destination: trip?.destination,
        price: trip?.price
      })
  }, [trip])
  

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
          tripForm={trip}
          setTripForm={setTripForm}
        />
    </section>
  )
}

export default UpdateTrip