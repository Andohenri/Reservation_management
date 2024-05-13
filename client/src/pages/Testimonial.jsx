import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import CustomModal from '../components/CustomModal';
import { useGetTestimonialsQuery } from '../redux/api/testimonialApiSlice';
import { subtract } from '../utils/utils';
import Quote from '../assets/quote.png';
import profile from '../assets/profile.jpg';


const Testimoniale = () => {
  const [paginationQuery, setPaginationQuery] = useState({
    pageSize: 10,
    pageNumber: 1
  })
  const { data, isLoading, refetch } = useGetTestimonialsQuery(paginationQuery);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = async () => {
    setIsOpen(false);
    await refetch();
  }
  const handleNextPage = async () => {
    setPaginationQuery(prev => ({ ...prev, pageSize: prev.pageSize + 10 }))
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
              <article key={test._id} className={`bg-white relative ${(idx + 1) % 5 === 0 && "md:col-span-2"} ${(idx + 1) % 10 === 0 && "md:row-span-2"} text flex flex-col justify-between rounded-lg shadow p-4`}>
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
                  <img src={test.author.image ? test.author.image : profile} alt="profile" className='h-14 w-14 border border-white shadow p-1 rounded-full' />
                  <div>
                    <p className='font-bold'>{test.author.username}</p>
                    <p className='text-gray-300'>{subtract(0, test.createdAt).fromNow()}</p>
                  </div>
                </div>
                <span className="absolute top-10 right-4 opacity-30"><img src={Quote} className='h-[4rem]' alt="quote" /></span>
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
      <div className='flex justify-end mt-4'>
        {data?.isNext && <button onClick={handleNextPage} className='bg-[#07143F] rounded-lg py-2 px-4 text-white text-lg font-semibold uppercase'>Voir plus</button>}
      </div>
    </section >
  </>)
}

export default Testimoniale