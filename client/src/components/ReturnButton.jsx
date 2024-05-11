import React from 'react'
import { FaCaretLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const ReturnButton = () => {
   const navigate = useNavigate()
   return (
      <div className='mb-6'>
         <button onClick={() => navigate(-1)} className='button_primary uppercase'><FaCaretLeft /> Retour</button>
      </div>
   )
}

export default ReturnButton