import React from 'react'
import { FaCaretLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const ReturnButton = () => {
   const navigate = useNavigate()
   return (
      <div className='mb-6'>
         <button onClick={() => navigate(-1)} className='bg-[#FAB440] hover:bg-[#ffa616] text-white flex items-center gap-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase'><FaCaretLeft /> Retour</button>
      </div>
   )
}

export default ReturnButton