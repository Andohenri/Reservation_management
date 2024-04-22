import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../redux/api/userApiSlice'
import { setCredentials } from '../redux/features/auth/authSlice';

const Register = () => {
   const [formData, setFormData] = useState({});

   const dispatch = useDispatch()
   const navigate = useNavigate() 

   const [register, { isLoading }] = useRegisterMutation()
   const { userInfo } = useSelector(state => state.auth)

   const { search } = useLocation()
   const sp = new URLSearchParams(search)
   const redirect = sp.get('redirect') || '/'

   useEffect(() => {
      if(userInfo){
         navigate(redirect)
      }
   }, [navigate, redirect, userInfo]) 

   const handleChange = (e) => {
      setFormData({...formData, [e.target.id]: e.target.value });
   }
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await register(formData).unwrap()
         dispatch(setCredentials({...res}))
         navigate(redirect)
         console.log('User created')
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <main className='max-w-5xl mx-auto'>
         <section className='flex flex-col items-center gap-4 md:flex-row h-[90vh]'>
            <div className='md:flex-1 '>
               <h1 className='head_text max-md:text-center p-4'>Bienvenue sur [Nom de l'application] - Votre plateforme ultime de réservation de train !</h1>
            </div>
            <div className='flex-1 mb-4'>
               <form onSubmit={handleSubmit} className='shadow-md rounded-lg p-8'>
                  <div className='mb-4'>
                     <label className='label' htmlFor="username">Nom d'utilisateur</label>
                     <input className='input' type="text" name="username" id="username" onChange={handleChange}/>
                  </div>
                  <div className='mb-4'>
                     <label className='label' htmlFor="email">E-mail</label>
                     <input className='input' type="text" name="email" id="email" onChange={handleChange}/>
                  </div>
                  <div className='mb-6 w-full'>
                     <label className='label' htmlFor="username">Mot de passe</label>
                     <input className='input' type="password" name="password" id="password" onChange={handleChange}/>
                  </div>
                  <div className="flex items-center gap-2 justify-between">
                     <button disabled={isLoading} className="bg-[#FAB440] hover:bg-[#ffa616] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">{isLoading ? "Chargement..." : "Enregistrer"}</button>
                     <Link to={'/login'} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Vous avez déja un compte ?</Link>
                  </div>
               </form>
            </div>
         </section>
      </main>
   )
}

export default Register