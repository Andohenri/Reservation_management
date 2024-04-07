import { useState } from 'react'
import { useCreateTrainMutation } from '../../../redux/api/trainApiSlice'
import { toast } from 'react-toastify'
import FormTrain from '../../../components/FormTrain'

const CreateTrain = () => {
   const [trainForm, setTrainForm] = useState({})
   const [create, {isLoading , error}] = useCreateTrainMutation()

   const handleCreate = async (e) => {
      e.preventDefault()
      try {
         const res = await create(trainForm).unwrap()
         if(res.message) throw new Error(res.message)
         toast.success("Nouvel train créé avec succès");
         setTrainForm({});
      } catch (error) {
         toast.error(error || error.message || error.data.message)
      }
   }

   const handleChange = (e) => {
      setTrainForm({...trainForm, [e.target.id]: e.target.value});
   }
   return (
      <section className='px-4 py-6 mx-auto max-w-xl'>
         <FormTrain 
            loading={isLoading}
            handleChange={handleChange}
            handleCreate={handleCreate}
            trainForm={trainForm}
         />
      </section>
   )
}

export default CreateTrain