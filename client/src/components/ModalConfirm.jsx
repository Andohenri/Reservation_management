import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ModalConfirm = ({ text, icon, isOpen, closeModal, isLoading, request }) => {
   return (
      <Modal className='modal' overlayClassName='overlay' isOpen={isOpen} onRequestClose={closeModal} >
         <div className='mb-4 flex gap-2 items-center'>
            <span>{icon}</span>
            <h1 className='text font-semibold'>{text}</h1>
         </div>
         <div className='flex_between px-4'>
            <button onClick={request} disabled={isLoading} className='bg-red-500 hover:bg-red-600 focus:bg-red-700 active:bg-red-800 disabled:bg-gray-400 font-bold text-white text-center text-base flex items-center gap-2 justify-center py-2 px-4 rounded-lg shadow-md focus:outline-none transition-all uppercase'>{isLoading ? "Suppression..." : "Ok, supprimer"}</button>
            <button onClick={closeModal} className='bg-gray-500 hover:bg-gray-600 focus:bg-gray-700 active:bg-gray-800 font-bold text-white text-center text-base flex items-center gap-2 justify-center py-2 px-4 rounded-lg shadow-md focus:outline-none transition-all uppercase'>Annuler</button>
         </div>
      </Modal>
   )
}

export default ModalConfirm