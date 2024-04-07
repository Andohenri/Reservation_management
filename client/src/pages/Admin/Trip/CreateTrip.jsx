import React, { useState } from 'react'
import FormTrip from '../../../components/FormTrip'
import { useCreateTripMutation } from '../../../redux/api/tripApiSlice.js'
import moment from 'moment';
import 'moment/locale/fr';
import { toast } from 'react-toastify';

const CreateTrip = () => {
   const [tripForm, setTripForm] = useState({})
   const [create, {isLoading , error}] = useCreateTripMutation()

   const handleCreate = async (e) => {
      e.preventDefault()
      try {
         const res = await create(tripForm).unwrap()
         if(res.message) throw new Error(res.message)
         toast.success("Ce voyage commence " + moment(res.departure_date).fromNow());
         setTripForm({});
      } catch (error) {
         toast.error(error || error.message || error.data.message)
      }
   }

   const handleChange = (e) => {
      setTripForm({...tripForm, [e.target.id]:  e.target.value });
   }
   return (
      <section className='px-4 py-6 mx-auto max-w-xl'>
         <FormTrip 
            loading={false}
            handleChange={handleChange}
            handleCreate={handleCreate}
            tripForm={tripForm}
         />
      </section>
   )
}

export default CreateTrip