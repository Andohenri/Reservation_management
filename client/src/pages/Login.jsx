import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../redux/api/userApiSlice'
import { setCredentials } from '../redux/features/auth/authSlice'

const Login = () => {

   const [formData, setFormData] = useState({})
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const [login, { isLoading, error }] = useLoginMutation();
   const { userInfo } = useSelector(state => state.auth);

   const { search } = useLocation();
   const sp = new URLSearchParams(search);
   const redirect = sp.get('redirect') || '/';

   useEffect(() => {
      if(userInfo?.isAdmin){
         navigate('/admin/dashboard');
      }else if(userInfo){
         navigate(redirect)
      }
   }, [navigate, redirect, userInfo])

   const handleChange = (e) => {
      setFormData({...formData, [e.target.id]: e.target.value });
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const res = await login(formData).unwrap()
         dispatch(setCredentials({...res}))
         toast.success("Bienvenue sur TRAIN-TRIP :)")
      } catch (error) {
         toast.error(error?.data?.message || error?.message || error);
      }
  }

   return (
      <main className='max-w-5xl p-4 max-sm:pt-14 mx-auto'>
         <section className='flex flex-col items-center gap-4 md:flex-row h-[75vh]'>
            <div className='md:flex-1 p-4'>
               <h1 className='head_text max-md:text-center mb-4'>Bienvenue sur Train-Trip - Votre plateforme ultime de réservation de train !</h1>
               <p className='desc max-md:text-center'>Connectez-vous pour gérer vos réservations et accéder à toutes les fonctionalités de l'application</p>
            </div>
            <div className='flex-1 mb-4'>
               <form onSubmit={handleSubmit} className='shadow-md rounded-lg p-4'>
                  <div className='mb-4'>
                     <label className='label' htmlFor="email">Email</label>
                     <input className='input' type="text" name="email" id="email" onChange={handleChange} required/>
                  </div>
                  <div className='mb-6 w-full'>
                     <label className='label' htmlFor="password">Mot de passe</label>
                     <input className='input' type="password" name="password" id="password" onChange={handleChange} required/>
                  </div>
                  <div className="flex items-center gap-2 justify-between">
                     <button disabled={isLoading} className="bg-[#FAB440] hover:bg-[#ffa616] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">{isLoading ? "Chargement..." : "Se connecter"}</button>
                     <Link to={'/register'} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Vous n'avez pas de compte ?</Link>
                  </div>
               </form>
            </div>
         </section>
      </main>
   )
}

export default Login