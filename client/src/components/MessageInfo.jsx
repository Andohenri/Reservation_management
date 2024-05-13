import React from 'react'

const MessageInfo = ({message}) => {
   return (
      <section className='flex mt-10 justify-center px-4'>
         <h1 className='text-gray-600 text-2xl text-center font-semibold max-w-xl'>{message}</h1>
      </section>
   )
}

export default MessageInfo