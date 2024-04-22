import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { useGetRevenueByDateQuery } from '../../redux/api/reservationApiSlice';


const Dashboard = () => {
  const { data, isLoading, refetch, error } = useGetRevenueByDateQuery();

  const [opt, setOpt] = useState({
    options: {
      chart: {
        id: 'basic-bar',
        stacked: true
      },
      fill: {
        type: 'gradient',
        // gradient: {
        //   sahdeIntensity: 1,
        //   opacityFrom: 0.7,
        //   opacityTo: 0.5,
        //   stops: [0, 90, 100]
        // }
      },
      dataLabels: {
        enabled: true
      },
      title: {
        text: "Revenue par jour (en Ariary)"
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date"
        }
      },
      yaxis: {
        titel: {
          text: "En ARIARY"
        },
        min: 0
      },
      lengend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
      stroke: {
        curve: 'smooth'
      },
      colors: ["#4E47C6", "#07143F", "#FAB440"],
      tooltip: {
        theme: "dark"
      }
    },
    series: [{ name: 'Revenue Payé', data: [] }]
  });

  useEffect(() => {
    if (data?.length > 0) {
      const paidRevenue = data.map(revenueData => ({ x: revenueData.date, y: revenueData.paid }));
      const unpaidRevenue = data.map(revenueData => ({ x: revenueData.date, y: revenueData.unpaid }));
      const totalRevenue = data.map(revenueData => ({ x: revenueData.date, y: revenueData.total }));

      setOpt(prevState => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: paidRevenue.map((item) => item.x)
          }
        },
        series: [
          { name: 'Réservation payé', data: paidRevenue.map(item => item.y) },
          { name: 'Réservation non payé', data: unpaidRevenue.map(item => item.y) },
          { name: 'Revenue total', data: totalRevenue.map(item => item.y) }
        ]
      }))
    }
  }, [data])

  return (
    <section className='w-[85%] lg:max-w-5xl lg:mx-auto '>
      <h1 className="head_text">Tableau de bord</h1>
      <div className='flex justify-around'>
        <span>Revenus total, le revenue moyen par reservation</span>
        <span>Nbr totale de reservation effectue paye ou en attentes</span>
        <span>Feedback en real time</span>
        <span>Total Reservation</span>
      </div>
      <div className='flex'>
        <div className='flex-1'>
          <ReactApexChart options={opt.options} series={opt.series} type="area" height={500} />
        </div>
      </div>
    </section>
  )
}

export default Dashboard