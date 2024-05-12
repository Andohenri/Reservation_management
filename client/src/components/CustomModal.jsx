import React, { useState } from 'react'
import Modal from 'react-modal';
import { FaCaretDown, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { usePostTestimonialsMutation } from '../redux/api/testimonialApiSlice';
import socket from '../utils/socket.js';

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, closeModal }) => {
  const [note, setNote] = useState('');
  const [content, setContent] = useState('');
  const [postTest, { isLoading }] = usePostTestimonialsMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await postTest({ note, content }).unwrap();
      toast.success("Votre témoignage est posté.");
      socket.emit('send testimonial', res);
      setNote('');
      setContent('');
      closeModal();
    } catch (error) {
      toast.error(error?.data?.message || error?.message || error);
    }
  }

  return (
    <Modal className='modal' overlayClassName='overlay' isOpen={isOpen} onRequestClose={closeModal}>
      <div onClick={closeModal} className='absolute top-4 right-4'><FaTimes className='text-gray-800' size={24} /></div>
      <div className='flex_between'>
        <h1 className='head_text mb-4'>Laisser votre avis sur TRAIN-TRIP</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className='flex-1 mb-4'>
          <label htmlFor="note" className='label'>Avis personnel</label>
          <div className="relative">
            <select className='input_table' id="note" onChange={e => setNote(e.target.value)} value={note} required>
              <option value="">Séléctionner votre avis</option>
              <option value="1">Insatisfaisant</option>
              <option value="2">Moyen</option>
              <option value="3">Satisfaisant</option>
              <option value="4">bon</option>
              <option value="5">Excellent</option>
            </select>
            <span className='absolute top-3 right-1 md:right-2 pointer-events-none'><FaCaretDown className='text-gray-800' /></span>
          </div>
        </div>
        <div className='flex-1 relative'>
          <label htmlFor="content" className='label'>Experience</label>
          <textarea className="input" placeholder="Raconter votre expérience en détail" rows={10} value={content} onChange={e => setContent(e.target.value)} required/>
        </div>
        <button type='submit' disabled={isLoading} className='button_primary mt-4 uppercase'>{isLoading ? "Soumission..." : "Soumettre"}</button>
      </form>
    </Modal>
  )
}

export default CustomModal