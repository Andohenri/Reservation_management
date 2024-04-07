import React, { useEffect, useState } from 'react'
import moment from 'moment';
import 'moment/locale/fr';
import { useGetAllTripsQuery } from '../../../redux/api/tripApiSlice';

const AdminTrip = () => {
  //trainId, departure_date, arrival_date, origin, destination, price
  const [trips, setTrips] = useState([])
  const {data, isLoading, refetch} = useGetAllTripsQuery();
  const handleClick = async () => {
    await refetch()
  }
  useEffect(() => {
    setTrips(data)
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
        {trips?.map(t => (
          <h1 onClick={handleClick} key={t._id}>{t.trainId.name} ^^ {moment(t.departure_date).locale('fr').fromNow()}</h1>
        ))}
      </div>
    </section>
  )
}

export default AdminTrip