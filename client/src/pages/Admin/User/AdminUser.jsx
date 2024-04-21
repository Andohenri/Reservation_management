import React, { useState } from 'react';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import SearchBar from '../../../components/SearchBar';
import { useGetAllUsersQuery } from '../../../redux/api/userApiSlice';
import ProfileImage from '../../../assets/profile.jpg';

const AdminUser = () => {

  const {data, refetch, isLoading, error} = useGetAllUsersQuery()
  // const [deleteUser] = useDeleteUserMutation()
  // const [updateUser] = useUpdateUserMutation()

  const [editableUser, setEditableUser] = useState(null)
  const [editableUserName, setEditableUserName] = useState('')
  const [editableUserEmail, setEditableUserEmail] = useState('')
  const [search, setSearch] = useState('')

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail
      })
      await refetch()
      setEditableUser(null)
      setEditableUserEmail('')
      setEditableUserName('')
      console.log("Updated!")
    } catch (error) {
      console.log(error.data.message || error.message || error)
    }
  }
  const toggleEdit = (id, username, email) => {
    setEditableUser(id)
    setEditableUserName(username)
    setEditableUserEmail(email)
  }
  const deleteHandler = async (id) => {
    if(window.confirm("Etes-vous sur de vouloir supprimer ce client ?")){
      try {
        await deleteUser(id)
        await refetch()
        console.log("user deleted!")
      } catch (error) {
        console.log(error.data.mesage || error.error)
      }
    }
  }

  return (
    <section>
        <div className='flex justify-between items-center pb-5 w-[88%] xl:w-full'>
          <h1 className='head_text'>Clients</h1>
          <SearchBar value={search} handleSearch={(e) => setSearch(e.target.value)}/>
        </div>
        {!isLoading ? (
          <div className="shadow-inner h-[32rem] overflow-x-scroll lg:overflow-x-hidden w-[90%] xl:w-full">
            <table className="table-auto divide-y divide-gray-500">
              <thead>
                <tr>
                  <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'></th>
                  <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                  <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Nom d'utilisateur</th>
                  <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                  <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Admin</th>
                  <th scope="col" className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'></th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {data?.map(user => (
                  <tr key={user._id}>
                    <td><img className='h-12 w-10' src={user.image || ProfileImage} alt={'profile'} /></td>
                    <td className="px-6 py-3">{user._id}</td>
                    <td className="px-6 py-3">
                      { editableUser === user._id
                        ? (
                          <div className="flex items-center justify-between gap-4">
                            <input className="input_table" type="text" value={editableUserName} onChange={e => setEditableUserName(e.target.value)}/>
                            <button onClick={() => updateHandler(user._id)} className="text-white rounded bg-[#FAB440] px-4 py-2"><FaCheck /></button>
                          </div>
                        )
                        : (
                          <div className="flex items-center justify-between gap-4">
                            <p>{user.username}</p>
                            <button onClick={() => toggleEdit(user._id, user.username, user.email)} className="text-white rounded bg-blue-500 px-4 py-2"><FaEdit /></button>
                          </div>
                        )
                      }
                    </td>
                    <td className="px-6 py-3">
                      {editableUser === user._id
                        ? (
                          <div className="flex items-center justify-between gap-4">
                            <input className="input_table" type="text" value={editableUserEmail} onChange={e => setEditableUserEmail(e.target.value)}/>
                            <button onClick={() => updateHandler(user._id)} className="text-white rounded bg-[#FAB440] px-4 py-2"><FaCheck /></button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-4">
                            <p>{user.email}</p>
                            <button onClick={() => toggleEdit(user._id, user.username, user.email)} className="text-white rounded bg-blue-500 px-4 py-2"><FaEdit/></button>
                          </div>
                        )
                      }
                    </td>
                    <td className="px-6 py-3">{user.isAdmin ? <FaCheck className='text-green-500'/> : <FaTimes style={{color: "red"}} />}</td>
                    <td className="px-6 py-3">{!user.isAdmin ? <button onClick={() => deleteHandler(user._id)} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"><FaTrash /></button> : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <section className='flex justify-center'>
            <h1>Loading...</h1>
          </section>
        )}
    </section>
  )
}

export default AdminUser