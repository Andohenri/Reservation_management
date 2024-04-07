import React, { useState } from 'react'
import { useGetAllTrainsQuery } from '../redux/api/trainApiSlice'

const FormTrip = ({handleUpdate, handleCreate, tripForm, handleChange, loading}) => {
   const { data } = useGetAllTrainsQuery()
   return (
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
               <input className='input' type="date" name="departure_date" id="departure_date" defaultValue={tripForm?.departure_date?.split('T')[0] || ''} onChange={handleChange} required/>
            </div>
            <div className='flex-2'>
               <label className='label' htmlFor="hour_dep">Heure de départ</label>
               <input className='input' type="time" name="hour_dep" id="hour_dep" defaultValue={handleUpdate ? tripForm?.departure_date?.split('T')[1].split('.')[0] || '' : tripForm?.hour_dep || ''} onChange={handleChange} required/>
            </div>
         </div>
         <div className='mb-4 flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
               <label className='label' htmlFor="arrival_date">Date d'arrivée</label>
               <input className='input' type="date" name="arrival_date" id="arrival_date" defaultValue={tripForm?.arrival_date?.split('T')[0] || ''} onChange={handleChange} required/>
            </div>
            <div className='flex-2'>
               <label className='label' htmlFor="hour_arr">Heure d'arrivée</label>
               <input className='input' type="time" name="hour_arr" id="hour_arr" defaultValue={handleUpdate ? tripForm?.arrival_date?.split('T')[1].split('.')[0] || '' : tripForm?.hour_arr || ''} onChange={handleChange} required/>
            </div>
         </div>
         <div className='mb-4 flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
               <label className='label' htmlFor="origin">Origine</label>
               <input className='input' type="text" name="origin" id="origin" defaultValue={tripForm?.origin || ''} onChange={handleChange} required/>
            </div>
            <div className='flex-1'>
               <label className='label' htmlFor="destination">Déstination</label>
               <input className='input' type="text" name="destination" id="destination" defaultValue={tripForm?.destination || ''} onChange={handleChange} required/>
            </div>
         </div>
         <div className='mb-4'>
            <div className='flex-1'>
               <label className='label' htmlFor="price">Prix d'un voyage</label>
               <input className='input' type="number" name="price" id="price" defaultValue={tripForm?.price || ''} onChange={handleChange} required/>
            </div>
         </div>
         <div className="flex justify-between">
            <button className="bg-[#FAB440] hover:bg-[#ffa616] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase" type="submit">{handleUpdate ? (loading ? 'Modification...' : 'Modifier') : (loading ? 'Création...' : 'Créer')}</button>
         </div>
      </form>
   )
}

export default FormTrip