import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';


const Dashboard = () => {
  const [opt, setOpt] = useState({
    options: {
      chart: {
        id: 'basic-bar'
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      }
    },
    series: [{
      name: 'Somme d\'argent',
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
    }, {
      name: 'client',
      data: [30, 40, 45, 200, 49, 300, 70, 91, 100]
    }]
  })
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
        <ReactApexChart options={opt.options} series={opt.series} type="bar" height={350} />
      </div>
    </section>
  )
}

export default Dashboard