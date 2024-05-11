import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import CustomModal from '../components/CustomModal';
import { useGetTestimonialsQuery } from '../redux/api/testimonialApiSlice';


const Testimoniale = () => {

  const { data, isLoading, refetch } = useGetTestimonialsQuery();

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = async () => {
    setIsOpen(false);
    await refetch();
  }

  return (<>
    <CustomModal isOpen={isOpen} closeModal={closeModal} />
    <section className='max-w-5xl mx-auto p-6'>
      <div className='flex_between'>
        <h1 className="head_text mb-6">Les témoignages des clients</h1>
        <button className='button_primary' onClick={openModal}>Témoigner</button>
      </div>
      <div className='mt-10 grid gap-4 grid-cols-2'>
        {!isLoading ? data?.length > 0 ? (
          data?.map(test => (
            <article key={test._id} className='bg-white rounded-lg shadow p-4'>
              <div className='flex gap-4 items-center py-2 px-4 rounded-lg'>
                <span className='flex gap-1'>
                  {[...Array(test.note).keys()].map(x => (
                    <FaStar key={x + 1} size={24} style={{ color: 'yellow' }} />
                  ))}
                </span>
              </div>
              <div className='relative p-4'>
                <p className='text'>
                  {test.content}
                </p>
              </div>
              <div className='flex items-center p-4 gap-4'>
                <img src={test.author.image} alt="profile" className='h-14 w-14 border border-white shadow p-1 rounded-full' />
                <p className='font-bold'>{test.author.username}</p>
              </div>
            </article>
          ))
        ) : (
          <section className='flex justify-center'>
            <h1>Aucun témoignages pour le moment</h1>
          </section>
        ) : (
          <section className='flex justify-center'>
            <h1>Chargement...</h1>
          </section>
        )}
      </div>
    </section>
  </>)
}

export default Testimoniale