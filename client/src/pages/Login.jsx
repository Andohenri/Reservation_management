import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
   return (
      <main className='max-w-5xl mx-auto'>
         <section className='flex flex-col gap-4 md:flex-row h-[90vh]'>
            <div className='flex-1 flex justify-center items-center'>
               <h1 className='head_text max-md:text-center p-4'>Bienvenue sur [Nom de l'application] - Votre plateforme ultime de réservation de train !</h1>
            </div>
            <div className='flex-1 flex flex-col justify-center items-center mb-4'>
               <form className='shadow-md rounded-lg p-4'>
                  <div className='mb-4'>
                     <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Nom d'utilisateur</label>
                     <input className='shadow appearance-none border border-[#FAB440] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' type="text" name="username" id="username" />
                  </div>
                  <div className='mb-6 w-full'>
                     <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Mot de passe</label>
                     <input className='shadow appearance-none border border-[#FAB440] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' type="password" name="password" id="password" />
                  </div>
                  <div className="flex items-center gap-2 justify-between">
                     <button className="bg-[#FAB440] hover:bg-[#ffa616] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Se connecter</button>
                     <Link to={'/register'} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Don't have an account ?</Link>
                  </div>
               </form>
            </div>
         </section>
      </main>
   )
}

export default Login