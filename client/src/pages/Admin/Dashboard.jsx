import React from 'react'

const Dashboard = () => {
  return (
    <section className='max-w-5xl mx-auto'>
      <h1 className="head_text">Tableau de bord</h1>
      <div className='flex justify-around'>
        <span>Somme argent</span>
        <span>total client eff voyage</span>
        <span>Total voyage</span>
        <span>Total Reservation</span>
      </div>
      <div>
        <p>Chart bar</p>
        <p>Pie chart for the user who have making a reservation</p>
        <p>Line chart for amount per day</p>
      </div>
    </section>
  )
}

export default Dashboard