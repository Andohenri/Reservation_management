import React, { useEffect, useState } from 'react'
import { useGetAllTrainsQuery } from '../../../redux/api/trainApiSlice.js'

const AdminTrain = () => {
  const [trains, setTrains] = useState([])
  const {data, isLoading, refetch} = useGetAllTrainsQuery();
  const handleClick = async () => {
    await refetch()
  }
  useEffect(() => {
    setTrains(data)
  }, [handleClick, data])

  if(isLoading){
    return (
      <section className='flex justify-center'>
        <h1>Loading...</h1>
      </section>
    )
  }

  return (
    <section>
      <div>
        {trains?.map(t => (
          <h1 onClick={handleClick} key={t._id}>{t.name} ^^ {t.type}</h1>
        ))}
      </div>
    </section>
  )
}

export default AdminTrain