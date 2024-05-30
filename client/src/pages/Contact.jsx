import React from 'react'
import { MdMailOutline, MdOutlinePhone, MdOutlinePlace } from 'react-icons/md'

const Contact = () => {
  return (
    <main className='max-w-5xl mx-auto p-6'>
      <h1 className='head_text mb-6'>Entrer en contact</h1>
      <div className='flex items-center flex-col md:flex-row gap-4 justify-between'>
        <div className='flex flex-col gap-4 pb-12 font-semibold text-gray-800'>
          <p className='mb-6 desc font-normal'>
            Nous sommes là pour répondre à toutes votre questions et vous fournir l'assistance nécessaire. N'hésiter pas à nous contacter via les moyens suivants:
          </p>
          <div className='flex items-center gap-4'>
            <MdOutlinePlace size={24} />
            <div>
              <p>237 A3/3710 Ampitakely</p>
              <p>Fianarantsoa, 301</p>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <MdOutlinePhone size={24} />
            <div>
              <p>+261 34 97 562 46</p>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <MdMailOutline size={24} />
            <div>
              <p>andohenrirazafinatoandro@gmail.com</p>
            </div>
          </div>
        </div>
        <form className='md:max-w-xl w-full'>
          <div className='mb-4 flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <label className='label' htmlFor="name">Nom</label>
              <input placeholder='Votre nom' className='input' type="text" name="name" required />
            </div>
            <div className='flex-1'>
              <label className='label' htmlFor="firstname">Prénom</label>
              <input placeholder="Votre prénom" className='input' type="text" name="firstname" required />
            </div>
          </div>
          <div className='mb-4 flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <label className='label' htmlFor="email">Email</label>
              <input placeholder="example@example.com" className='input' type="email" name="email" required />
            </div>
            <div className='flex-1'>
              <label className='label' htmlFor="phone">Numéro téléphone</label>
              <input placeholder="+261 34 ... .." className='input' type={'tel'} onChange={(e) => console.log(e.target.value)} name="phone" required />
            </div>
          </div>
          <div className='mb-4'>
            <div className='flex-1'>
              <label className='label' htmlFor="message">Message</label>
              <textarea placeholder="Votre messages" className='input' name="message" rows={5} required />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="button_primary uppercase" type="submit">Envoyer</button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Contact