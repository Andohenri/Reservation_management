import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetTrainQuery, useUpdateTrainMutation } from '../../../redux/api/trainApiSlice'
import { toast } from 'react-toastify'
import FormTrain from '../../../components/FormTrain'

const UpdateTrain = () => {
   const navigate = useNavigate()
   const [trainForm, setTrainForm] = useState({})
   const { id: trainId } = useParams()
   const { data: train } = useGetTrainQuery(trainId);

   const [update, {isLoading, error}] = useUpdateTrainMutation()

   useEffect(() => {
     setTrainForm(train)
   }, [train])
   

   const handleUpdate = async (e) => {
      e.preventDefault()
      try {
         const res = await update({ data: trainForm, trainId }).unwrap()
         if(res.message) throw new Error(res.message);
         toast.success("Le train a été modifié avec succès")
         navigate('/admin/trains');
      } catch (err) {
         toast.error(err || err.message || err.data.message || error)
      }
   }
   const handleChange = (e) => {
      setTrainForm({...trainForm, [e.target.id]: e.target.value});
   }
   return (
      <section className='px-4 py-6 mx-auto max-w-xl'>
         <FormTrain 
            loading={isLoading}
            handleUpdate={handleUpdate}
            handleChange={handleChange}
            trainForm={train}
         />
      </section>
   )
}

export default UpdateTrain