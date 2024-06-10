import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { MdWarning } from 'react-icons/md';
import ModalConfirm from './ModalConfirm';

const ButtonDelete = ({ request, loading, text }) => {
   const [isOpen, setIsOpen] = useState(false);
   const openModal = () => setIsOpen(true);
   const closeModal = () => setIsOpen(false);

   return (<>
      {isOpen &&
         <ModalConfirm
            text={text}
            icon={<MdWarning size={48} className='text-red-400 mr-4' />}
            isLoading={loading}
            isOpen={isOpen}
            closeModal={closeModal}
            request={request}
         />
      }
      <button onClick={openModal} className="transition-all bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white">
         <FaTrash />
      </button>
   </>)
}

export default ButtonDelete