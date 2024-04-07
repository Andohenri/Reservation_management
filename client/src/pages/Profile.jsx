import React, { useEffect, useRef, useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useUpdateCurrentUserProfileMutation, useUploadImageMutation } from '../redux/api/userApiSlice.js'
import { setCredentials } from '../redux/features/auth/authSlice.js'

const Profile = () => {

  const fileRef = useRef()
  const [profileData, setProfileData] = useState({
    password: ''
  })
  const [image, setImage] = useState(undefined)
  const [confirmPassword, setConfirmPassword] = useState('')
  const { userInfo } = useSelector(state => state.auth)
  const [updateProfile, {isLoading: loadingProfileUpdate}] = useUpdateCurrentUserProfileMutation()
  const [uploadImage, {isLoading: loadingUploadImage}] = useUploadImageMutation()

  useEffect(() => {
    if(image){
      upload(image)
    }
  }, [image])

  const dispatch = useDispatch()
  const upload = async (image) => {
    try {
      const formData = new FormData()
      formData.append('image', image)
      const result = await uploadImage(formData).unwrap()
      console.log(result);
      setImage(undefined);
      const res = await updateProfile({image: result.image}).unwrap()
      dispatch(setCredentials({...res}))
      toast.success("Votre photo de profile a été mis à jour")
    } catch (error) {
      toast.error(error)
    }
  }
  const handleUpdate = async (e) => {
      e.preventDefault()
      if(profileData.password !== confirmPassword){
        toast.info("Les mot de passes ne sont pas conforme")
      }else{
        try {
            const res = await updateProfile(profileData).unwrap()
            dispatch(setCredentials({...res}))
            toast.success("Profile a été modifié avec succès");
        } catch (error) {
            console.log(error?.data || error?.message || error)
        }
      }
  }
  const handleChange = (e) => {
    setProfileData({...profileData, [e.target.id]: e.target.value});
  }
  return (
    <section className='px-4 py-6 mx-auto max-w-xl'>
      <div className='flex flex-row gap-4'>
        <div className='relative bg-white rounded-full p-1 shadow'>
          <div className='overflow-hidden rounded-full h-48 w-48'>
            <img className='object-contain h-fit w-full rounded-full' src={userInfo.image} alt="Profile" />
          </div>
          <button onClick={() => fileRef.current.click()} className="absolute top-36 right-4 z-2 rounded-full shadow bg-white p-2"><FaCamera /></button>
          <input ref={fileRef} hidden type="file" name='image' accept='image/*' onChange={e => setImage(e.target.files[0])}/>
        </div>
        <div>
          <h1 className='text-lg font-semibold'>{userInfo.username}</h1>
          <h1 className='text-base'>{userInfo.email}</h1>
        </div>
      </div>
      <div>
        <form onSubmit={handleUpdate} className='shadow-md rounded-lg p-4'>
          <div className='mb-4'>
            <label className='label' htmlFor="email">Nom d'utilisateur</label>
            <input className='input' type="text" name="username" id="username" defaultValue={userInfo.username} onChange={handleChange} required/>
          </div>
          <div className='mb-4'>
            <label className='label' htmlFor="email">Email</label>
            <input className='input' type="email" name="email" id="email" defaultValue={userInfo.email} onChange={handleChange} required/>
          </div>
          <div className='mb-6 w-full'>
            <label className='label' htmlFor="password">Mot de passe</label>
            <input className='input' type="password" name="password" id="password" defaultValue={''} onChange={handleChange}/>
          </div>
          <div className='mb-6 w-full'>
            <label className='label' htmlFor="c-password">Confirmer Mot de passe</label>
            <input className='input' type="password" name="c-password" id="c-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
          </div>
          <div className="flex justify-between">
            <button className="bg-[#FAB440] hover:bg-[#ffa616] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Modifier</button>
            <button className="bg-[#FAB440] hover:bg-[#ffa616] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Mes résérvations</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Profile