import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
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
         dispatch(setCredentials({...res}));
         navigate(redirect);
      } catch (error) {
         toast.error(error?.data?.message || error?.message || error);
      }
   }

   return (
      <main className='max-w-5xl p-4 max-sm:pt-14 mx-auto'>
         <section className='flex flex-col items-center gap-2 md:flex-row h-[90vh]'>
            <div className='md:flex-1 p-4'>
               <h1 className='head_text max-md:text-center mb-4'>Bienvenue sur Train-Trip - Votre plateforme ultime de réservation de train !</h1>
               <p className="desc max-md:text-center">Inscrivez-vous pour créer un compte et commencer à réserver vos voyages en toutes simplicité</p>
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
                     <button disabled={isLoading} className="button_primary" type="submit">{isLoading ? "Chargement..." : "Enregistrer"}</button>
                     <Link to={'/login'} className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800">Vous avez déja un compte ?</Link>
                  </div>
               </form>
            </div>
         </section>
      </main>
   )
}

export default Register