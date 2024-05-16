import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { FaStar } from 'react-icons/fa';
import { RiFeedbackLine, RiMoneyDollarBoxLine, RiShoppingBag3Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useGetRevenueByDateQuery } from '../../redux/api/reservationApiSlice';
import { useGetTestimonialsQuery } from '../../redux/api/testimonialApiSlice';
import socket from '../../utils/socket';
import profile from '../../assets/profile.jpg'


const Dashboard = () => {
  const [paginationQuery, setPaginationQuery] = useState({
    pageSize: 10,
    pageNumber: 1
  });
  const { data, isLoading, refetch, error } = useGetRevenueByDateQuery();
  const { data: testimonials, refetch: fetch } = useGetTestimonialsQuery(paginationQuery);
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

  const handleNextPage = async () => {
    setPaginationQuery(prev => ({ ...prev, pageSize: prev.pageSize + 10 }))
  }

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
    <section className='max-md:w-[85%] lg:max-w-6xl lg:mx-auto '>
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
              <p className='flex text-gray-800 font-extrabold'>{testimonials?.totalsCount}</p>
            </div>
          </div>
        </article>
      </div>
      <div className='flex gap-4 flex-col lg:flex-row'>
        <div className='flex-1'>
          <ReactApexChart options={opt.options} series={opt.series} type="area" height={500} />
        </div>
        <div className='lg:w-[30%]'>
          <h1 className='font-bold text-md text-gray-600 mb-2'>Les témoignages</h1>
          <div className='overflow-auto h-[27rem]'>
            {testimonials?.tests?.map(test => (
              <Link key={test._id} to='/testimonial'>
                <div className='flex bg-white items-start justify-between rounded mb-2 px-4 py-2 gap-2'>
                  <div className='h-8 w-8 overflow-hidden mt-1'>
                    <img src={test.author.image ? test.author.image : profile} alt="profile" className='h-8 w-8 rounded-full' />
                  </div>
                  <div className='flex-1'>
                    <p className='text'>{test.content.length < 35 ? test.content : `${test.content.slice(0, 35)}...`}</p>
                  </div>
                  <span className='flex text-gray-800 text-xl font-extrabold items-center'><FaStar className='text-yellow-300 mr-1' size={24} />{test.note}</span>
                </div>
              </Link>
            ))}
            {testimonials?.isNext && <button onClick={handleNextPage} className='bg-[#07143F] rounded py-2 px-4 w-full text-white text-md font-semibold uppercase'>Voir plus</button>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard