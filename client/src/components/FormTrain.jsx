import React from 'react'
import { FaCaretLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const FormTrain = ({handleUpdate, handleCreate, trainForm, handleChange, loading}) => {
   const navigate = useNavigate()
   return (<>
      <div className='mb-6'>
         <button onClick={() => navigate(-1)} className='bg-[#FAB440] hover:bg-[#ffa616] text-white flex items-center gap-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase'><FaCaretLeft /> Retour</button>
      </div>
      <form onSubmit={handleUpdate || handleCreate} className='shadow-md rounded-lg p-4'>
         <div className='mb-4'>
            <label className='label' htmlFor="name">Nom</label>
            <input className='input' placeholder='Entrer le nom du train' type="text" name="name" id="name" defaultValue={trainForm?.name || ''} onChange={handleChange} required/>
         </div>
         <div className='mb-4'>
            <label className='label' htmlFor="type">Type</label>
            <input className='input' placeholder='Entrer le type du train' type="text" name="type" id="type" defaultValue={trainForm?.type || ''} onChange={handleChange} required/>
         </div>
         <div className='mb-6 w-full'>
            <label className='label' htmlFor="capacity">Capacité</label>
            <input className='input' placeholder='Entrer le nombre de place dans le train' type="number" name="capacity" id="capacity" defaultValue={trainForm?.capacity || ''} onChange={handleChange} required/>
         </div>
         <div className="flex justify-between">
            <button className="bg-[#FAB440] hover:bg-[#ffa616] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase" type="submit">{handleUpdate ? (loading ? 'Modification...' : 'Modifier') : (loading ? 'Création...' : 'Créer')}</button>
         </div>
      </form>
   </>)
}

export default FormTrain