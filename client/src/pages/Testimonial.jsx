import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import CustomModal from '../components/CustomModal';
import { useGetTestimonialsQuery } from '../redux/api/testimonialApiSlice';
import { subtract } from '../utils/utils';


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
      <div className='flex_between mb-6 gap-4'>
        <h1 className="head_text">Les témoignages des clients</h1>
        <button className='button_primary' onClick={openModal}>Témoigner</button>
      </div>
      <div className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {!isLoading ? data?.tests?.length > 0 ? (
          data?.tests?.map((test, idx) => (
            <article key={test._id} className={`bg-white ${(idx + 1) % 5 === 0 && "md:col-span-2"} ${(idx + 1) % 10 === 0 && "md:row-span-2"} text flex flex-col justify-between rounded-lg shadow p-4`}>
              <div className='flex gap-4 items-center py-2 px-4 rounded-lg'>
                <span className='flex gap-1'>
                  {[...Array(test.note).keys()].map(x => (
                    <FaStar key={x + 1} size={24} className="text-yellow-300 shadow-md" />
                  ))}
                </span>
              </div>
              <div className='relative p-4'>
                <p className='text'>
                  {test.content}
                </p>
              </div>
              <div className='flex items-center p-2 gap-4'>
                <img src={test.author.image} alt="profile" className='h-14 w-14 border border-white shadow p-1 rounded-full' />
                <div>
                  <p className='font-bold'>{test.author.username}</p>
                  <p className='text-gray-300'>{subtract(0, test.createdAt).fromNow()}</p>
                </div>
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