import React from 'react'
import { useGetAllTrainsQuery } from '../redux/api/trainApiSlice'
import ReturnButton from './ReturnButton'

const FormTrip = ({handleUpdate, handleCreate, tripForm, handleChange, loading}) => {
   const { data } = useGetAllTrainsQuery()
   return (<>
      <ReturnButton />
      <form onSubmit={handleUpdate || handleCreate} className='shadow-md rounded-lg p-4'>
         {
            handleUpdate ? <></> : <div className='mb-4'>
               <label className='label' htmlFor="trainId">Train</label>
               <select className='input' name="name" id="trainId" defaultValue={tripForm?.trainId || ''} onChange={handleChange} required>
                  <option value="">Choisissez un train</option>
                  {data?.map(train => train.status === 'avalaible' && (
                     <option key={train._id} value={train._id}>{train.name}</option>
                  ))}
               </select>
            </div>
         }
         <div className='mb-4 flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
               <label className='label' htmlFor="departure_date">Date de départ</label>
               <input className='input' type='datetime-local' name="departure_date" id="departure_date" defaultValue={tripForm?.departure_date} onChange={handleChange} required/>
            </div>
            <div className='flex-1'>
               <label className='label' htmlFor="arrival_date">Date d'arrivée</label>
               <input className='input' type="datetime-local" name="arrival_date" id="arrival_date" defaultValue={tripForm?.arrival_date} onChange={handleChange} required/>
            </div>
         </div>
         <div className='mb-4 flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
               <label className='label' htmlFor="origin">Origine</label>
               <input placeholder='La ville de départ' className='input' type="text" name="origin" id="origin" defaultValue={tripForm?.origin || ''} onChange={handleChange} required/>
            </div>
            <div className='flex-1'>
               <label className='label' htmlFor="destination">Déstination</label>
               <input placeholder="La ville d'arrivée" className='input' type="text" name="destination" id="destination" defaultValue={tripForm?.destination || ''} onChange={handleChange} required/>
            </div>
         </div>
         <div className='mb-4'>
            <div className='flex-1'>
               <label className='label' htmlFor="price">Prix</label>
               <input placeholder="Le prix d'un voyage" className='input' type="number" name="price" id="price" defaultValue={tripForm?.price || ''} onChange={handleChange} required/>
            </div>
         </div>
         <div className="flex justify-between">
            <button className="bg-[#FAB440] hover:bg-[#ffa616] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase" type="submit">{handleUpdate ? (loading ? 'Modification...' : 'Modifier') : (loading ? 'Création...' : 'Créer')}</button>
         </div>
      </form>
   </>)
}

export default FormTrip