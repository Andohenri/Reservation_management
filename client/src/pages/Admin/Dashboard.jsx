import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { RiFeedbackLine, RiMoneyDollarBoxLine, RiShoppingBag3Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useGetRevenueByDateQuery } from '../../redux/api/reservationApiSlice';
import { useGetTestimonialsQuery } from '../../redux/api/testimonialApiSlice';
import socket from '../../utils/socket';


const Dashboard = () => {
  const { data, isLoading, refetch, error } = useGetRevenueByDateQuery();
  const { data: testimonials, refetch: fetch } = useGetTestimonialsQuery();
  const [revenueTotal, setRevenueTotal] = useState(0);
  const [reservationNbr, setReservationNbr] = useState(0);
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
      colors: ["#07bc0c", "#e74c3c", "#FAB440"],
      tooltip: {
        theme: "dark"
      }
    },
    series: [{ name: 'Revenue Payé', data: [] }]
  });

  useEffect(() => {
    socket.on("new testimonial", async () => {
      toast.info("Un client a témoigné.");
      await fetch();
    });
   return () => {
      socket.off('new testimonial');
   }
  }, [socket])

  useEffect(() => {
    async function fetch() {
      await refetch()
    }
    fetch();
  }, [])
  

  useEffect(() => {
    if (data?.revenueData?.length > 0) {
      const paidRevenue = data?.revenueData?.map(revenueData => ({ x: revenueData.date, y: revenueData.paid }));
      const unpaidRevenue = data?.revenueData?.map(revenueData => ({ x: revenueData.date, y: revenueData.unpaid }));
      const totalRevenue = data?.revenueData?.map(revenueData => ({ x: revenueData.date, y: revenueData.total }));
      const revenue = paidRevenue.reduce((acc, item) => acc + item.y, 0);
      setRevenueTotal(revenue);
      setReservationNbr(data.reservations.length);

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
      <h1 className="head_text mb-6">Tableau de bord</h1>
      <div className='flex gap-4 flex-wrap mb-6'>
        <article className='bg-white flex flex-col gap-4 rounded-lg shadow p-4'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-yellow-200 rounded-lg'><RiMoneyDollarBoxLine size={32} className='text-[#FAB440]' /></div>
            <div className='text-xl text-gray-500'>
              <h1 className='font-bold'>Revenue Total</h1>
              <p className='flex text-gray-800 font-extrabold'>{revenueTotal}<span className='items-end'>Ar</span></p>
            </div>
          </div>
        </article>
        <article className='bg-white flex flex-col gap-4 rounded-lg shadow p-4'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-yellow-200 rounded-lg'><RiShoppingBag3Line size={32} className='text-[#FAB440]' /></div>
            <div className='text-xl text-gray-500'>
              <h1 className='font-bold'>Reservation</h1>
              <p className='flex text-gray-800 font-extrabold'>{reservationNbr}<span className='items-end'></span></p>
            </div>
          </div>
        </article>
        <article className='bg-white flex flex-col gap-4 rounded-lg shadow p-4'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-yellow-200 rounded-lg'><RiFeedbackLine size={32} className='text-[#FAB440]' /></div>
            <div className='text-xl text-gray-500'>
              <h1 className='font-bold'>FeedBack</h1>
              <p className='flex text-gray-800 font-extrabold'>{testimonials?.length}</p>
            </div>
          </div>
        </article>
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