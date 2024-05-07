import React, { useEffect, useState } from 'react'
import { FaArrowAltCircleRight, FaCaretDown, FaChair, FaCheck, FaRegClock, FaTicketAlt, FaTrain } from 'react-icons/fa'
import { WiTrain } from 'react-icons/wi'
import { MdAirlineSeatReclineNormal, MdDiversity1, MdMergeType } from 'react-icons/md'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useGetTripQuery } from '../redux/api/tripApiSlice'
import { setSatus, subtract } from '../utils/utils'
import { useGetReservationByIdQuery, useMakeReservationMutation, usePayReservationMutation } from '../redux/api/reservationApiSlice'
import { toast } from 'react-toastify'
import Train from '../assets/train2.png';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import Mvola from '../assets/mvola.png';
import Bravo from '../assets/bravo.jpg';

const TripDetails = () => {
  const { id } = useParams()
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState(2);
  const { data: trip, isLoading, refetch, error } = useGetTripQuery(id);
  const { data: reservationDB } = useGetReservationByIdQuery(sp.get('id'), {
    skip: sp.get('skip') ? false : true
  });
  const [makeReservation, { isLoading: loading }] = useMakeReservationMutation();
  const [payReservation, { isLoading: loadingPay }] = usePayReservationMutation();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState({});

  useEffect(() => {
    const step1 = sp.get('step');
    setStep(Number(step1) || 2);
  }, [sp, reservationDB]);

  useEffect(() => {
    setReservation(reservationDB);
  }, [reservationDB]);



  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await makeReservation({ trip: id, nbrTickets: quantity }).unwrap()
      await refetch()
      toast.success("La réservation a été placé avec succès");
      setReservation(res);
      navigate('?step=3');
    } catch (error) {
      toast.error(error?.data?.message || error?.message || error);
    }
  }
  const generatePdf = async (res) => {
    //Generate QRcode
    const qrData = `TRAIN-TRIP ticket n° ${res._id} de ${res.user.username} pour le voyage de ${res.trip.origin}-${res.trip.destination} le ${subtract(0, res.trip.departure_date).format("LLLL")}`;
    const qrOptions = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      rendererOpts: {
        quality: 0.3
      }
    };
    const qrImage = await QRCode.toDataURL(qrData, qrOptions);
    // Generate PDF
    const pdf = new jsPDF();
    pdf.text('TRAIN-TRIP Ticket', 10, 10);
    pdf.text(`Reservation n°: ${res._id} pour le voyage de ${res.trip.origin}-${res.trip.destination}`, 10, 20);
    pdf.text(`Voyage de: ${res.trip.origin}-${res.trip.destination}`, 10, 30);
    pdf.text(`Nom du voyageur: ${res.user.username}`, 10, 40);
    pdf.text(`Email du voyageur: ${res.user.email}`, 10, 50);
    pdf.text(`Date de départ: ${subtract(0, res.trip.departure_date).format("LLLL")}`, 10, 60);
    pdf.text(`Nombre de tickets: ${res.nbrTickets}`, 10, 70);
    pdf.text(`Prix: ${res.totalPrice} Ar`, 10, 80);

    // Draw QR code
    const imgWidth = 50; // Adjust the size of the QR code
    const imgHeight = 50; // Adjust the size of the QR code
    pdf.addImage(qrImage, 'JPEG', 10, 90, imgWidth, imgHeight);
    pdf.save('reservation_ticket.pdf');
  }
  const handlePay = async (id) => {
    try {
      const res = await payReservation(id).unwrap()
      toast.success("Le payement a été éffectuer avec succès");
      navigate('?step=4');
      await generatePdf(res);
    } catch (error) {
      toast.error(error?.data?.message || error?.message || error);
    }
  }
  const downloadPdf = async () => {
    await generatePdf(reservationDB);
  }
  return (
    <section className='max-w-4xl mx-auto p-6'>
      <div className="w-11/12 lg:w-4/6 mx-auto text-white mb-16 relative">
        <div className={`bg-gray-200 h-1 flex items-center justify-between before:absolute ${step === 2 ? 'before:w-1/3' : step === 3 ? 'before:w-2/3' : 'before:w-full'} before:content-[''] before:h-1 before:bg-indigo-700`}>
          <div className={`${step === 1 ? 'bg-white' : 'bg-indigo-700'} h-8 w-8 rounded-full shadow flex items-center justify-center relative p-2 z-10`}>
            {step === 1 ? <div className="h-3 w-3 bg-white rounded-full"></div> : <FaCheck size={16} />}
            <div className="absolute right-6 -top-6">
              <div className="relative bg-white shadow-lg px-2 py-1 rounded mt-16 -mr-12">
                <svg className="absolute top-0 -mt-1 w-full right-0 left-0" width="16px" height="8px" viewBox="0 0 16 8" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Progress-Bars" transform="translate(-322.000000, -198.000000)" fill="#FFFFFF">
                      <g id="Group-4" transform="translate(310.000000, 198.000000)">
                        <polygon id="Triangle" points="20 0 28 8 12 8"></polygon>
                      </g>
                    </g>
                  </g>
                </svg>
                <p tabIndex="0" className="focus:outline-none text-indigo-700 text-xs font-bold">Recherche</p>
              </div>
            </div>
          </div>
          <div className={`${step <= 2 ? 'bg-white' : 'bg-indigo-700'} h-8 w-8 rounded-full shadow flex items-center justify-center relative p-2 z-10`}>
            {step === 2 ? <div className="h-3 w-3 bg-indigo-700 rounded-full"></div> : <FaCheck size={16} />}
            <div className="absolute right-6 -top-6">
              <div className="relative bg-white shadow-lg px-2 py-1 rounded mt-16 -mr-12">
                <svg className="absolute top-0 -mt-1 w-full right-0 left-0" width="16px" height="8px" viewBox="0 0 16 8" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Progress-Bars" transform="translate(-322.000000, -198.000000)" fill="#FFFFFF">
                      <g id="Group-4" transform="translate(310.000000, 198.000000)">
                        <polygon id="Triangle" points="20 0 28 8 12 8"></polygon>
                      </g>
                    </g>
                  </g>
                </svg>
                <p tabIndex="0" className="focus:outline-none text-indigo-700 text-xs font-bold">Réservation</p>
              </div>
            </div>
          </div>
          <div className={`${step <= 3 ? 'bg-white' : 'bg-indigo-700'} h-8 w-8 rounded-full shadow flex items-center justify-center relative p-2 z-10`}>
            {step === 3 ? <div className="h-3 w-3 bg-indigo-700 rounded-full"></div> : <FaCheck size={16} />}
            <div className="absolute right-6 -top-6">
              <div className="relative bg-white shadow-lg px-2 py-1 rounded mt-16 -mr-12">
                <svg className="absolute top-0 -mt-1 w-full right-0 left-0" width="16px" height="8px" viewBox="0 0 16 8" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Progress-Bars" transform="translate(-322.000000, -198.000000)" fill="#FFFFFF">
                      <g id="Group-4" transform="translate(310.000000, 198.000000)">
                        <polygon id="Triangle" points="20 0 28 8 12 8"></polygon>
                      </g>
                    </g>
                  </g>
                </svg>
                <p tabIndex="0" className="focus:outline-none text-indigo-700 text-xs font-bold">Paiment</p>
              </div>
            </div>
          </div>
          <div className={`${step <= 4 ? 'bg-white' : 'bg-indigo-700'} h-8 w-8 rounded-full shadow flex items-center justify-center relative p-2 z-10`}>
            {step === 4 ? <div className="h-3 w-3 bg-indigo-700 rounded-full"></div> : <FaCheck size={16} />}
            <div className="absolute right-6 -top-6">
              <div className="relative bg-white shadow-lg px-2 py-1 rounded mt-16 -mr-12">
                <svg className="absolute top-0 -mt-1 w-full right-0 left-0" width="16px" height="8px" viewBox="0 0 16 8" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Progress-Bars" transform="translate(-322.000000, -198.000000)" fill="#FFFFFF">
                      <g id="Group-4" transform="translate(310.000000, 198.000000)">
                        <polygon id="Triangle" points="20 0 28 8 12 8"></polygon>
                      </g>
                    </g>
                  </g>
                </svg>
                <p tabIndex="0" className="focus:outline-none text-indigo-700 text-xs font-bold">Félicitation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {step === 2 && !isLoading && (
        <div className='p-4 shadow'>
          <div className='flex_between border-b pb-4'>
            <div className='flex_between gap-4 text font-semibold'>
              <img src={Train} alt="logo" className='w-14 h-14 rounded' />
              <div>
                <p className='flex_between gap-2'>{trip.trainId.name} <FaTrain /> </p>
                <p className='flex_between gap-2'> {trip.trainId.type} <MdMergeType /></p>
              </div>
            </div>
            <div className='flex gap-4 flex-col text'>
              <span className={`${trip.status === 'pending' ? 'bg-blue-200 text-blue-600' : trip.status === 'in progress' ? 'bg-yellow-200 text-yellow-600' : trip.status === 'cancelled' ? 'bg-red-200 text-red-600' : 'bg-green-200 text-green-600'} rounded-full text-sm font-bold px-2 py-1`}>{setSatus(trip.status)}</span>
              <p className='flex gap-2'><FaChair size={24} /> {trip.trainId.capacity}</p>
            </div>
          </div>
          <div className='p-4 flex flex-col gap-6 text'>
            <div className='flex_between text-gray-600'>
              <span className='flex_between gap-2'><FaArrowAltCircleRight /> {subtract(0, trip.departure_date).format("LL")}</span>
              <span className='flex_between gap-2'><FaArrowAltCircleRight /> {subtract(0, trip.arrival_date).format("LL")}</span>
            </div>
            <div className='flex_between'>
              <span>{trip.origin}</span>
              <span>{trip.destination}</span>
            </div>
            <div className='flex_between gap-4 font-bold text-3xl'>
              <span className=''>{trip.origin.slice(0, 3).toUpperCase()}</span>
              <span
                className={`hidden sm:flex relative flex-1 ${trip.status === 'pending' ? 'justify-start' : trip.status === 'in progress' ? 'justify-center' : 'justify-end'} before:content-[""] before:absolute before:w-full before:bg-gray-800 before:h-0.5 before:bottom-0 before:z-0`}><WiTrain size={32} className='text-blue-500 z-10' /></span>
              <span className=''>{trip.destination.slice(0, 3).toUpperCase()}</span>
            </div>
            <div className='flex_between text-gray-600 font-semibold'>
              <span className='flex_between gap-2'><FaRegClock /> {subtract(0, trip.departure_date).format("HH:mm")}</span>
              <span className='flex_between gap-2'><FaRegClock /> {subtract(0, trip.arrival_date).format("HH:mm")}</span>
            </div>
            <div className='flex_between text-gray-600 font-semibold'>
              <span className='flex_between gap-2'><FaTicketAlt size={24} /> $ {trip.price}</span>
              <span className='flex_between gap-2'><MdAirlineSeatReclineNormal size={24} /> {trip.avalaible_seats}</span>
            </div>
            {trip.status !== 'completed' || trip.status !== 'cancelled' ? (
              <form onSubmit={handleSubmit} className='flex_between'>
                {trip.avalaible_seats > 0 && (
                  <div className='relative w-[100px]'>
                    <select className='input_table' value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                      {[...Array(trip.avalaible_seats).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))}
                    </select>
                    <span className='absolute top-3 right-1 md:right-2 pointer-events-none'><FaCaretDown className='text-gray-800' /></span>
                  </div>
                )}
                <button type='submit' className='bg-[#FAB440] hover:bg-[#ffa616] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>{!loading ? 'Placer la réservation' : 'Chargement...'}</button>
              </form>
            ) : (
              <></>
            )}

          </div>
        </div>
      )}
      {step === 3 && (
        <div className='p-4 shadow'>
          <h1 className='head_text mb-6'>Votre réservation</h1>
          <div className='flex flex-col gap-4 text'>
            <div className='flex_between'>
              <h4 className='font-bold'>Prix d'un billet:</h4>
              <span>{trip?.price} Ar</span>
            </div>
            <div className='flex_between'>
              <h4 className='font-bold'>Place réservé:</h4>
              <span>{reservation?.nbrTickets}</span>
            </div>
            <div className='flex_between'>
              <h4 className='font-bold'>Départ:</h4>
              <span>{trip?.origin} le {subtract(0, trip?.departure_date).format('dddd D MMMM YYYY à HH:mm')}</span>
            </div>
            <div className='flex_between'>
              <h4 className='font-bold'>Arrivé:</h4>
              <span>{trip?.destination} le {subtract(0, trip?.arrival_date).format('dddd D MMMM YYYY à HH:mm')}</span>
            </div>
            <div className='flex_between'>
              <h4 className='font-bold text-2xl'>Total:</h4>
              <span>{reservation?.totalPrice} Ar</span>
            </div>
            {!reservation?.isPaid ? (<>
              <div className='w-full'>
                <button onClick={() => handlePay(reservation?._id)} className='flex items-center justify-center transition-all bg-yellow-300 hover:bg-yellow-400 text-green-700 w-full rounded-lg font-bold'>Payer via <img className='h-14' src={Mvola} alt="m-vola" /></button>
              </div>
              <div className='w-full'>
                <button className='transition-all bg-indigo-500 hover:bg-indigo-600 text-white w-full p-4 rounded-lg font-bold'>Autres méthodes de payment</button>
              </div>
            </>) : (
              <div className='mt-6'>
                <span className='text'>Ce réservation est déja payé.</span>  <Link className='text-indigo-500 font-semibold' to={'/reservation-management'}>Cliquez pour revenir en arrière</Link>
              </div>
            )}
          </div>
        </div>
      )}
      {step === 4 && (
        <div>
          <div className='bg-white rounded-lg p-2'>
            <img src={Bravo} alt="bravo" />
          </div>
          <p className="head_text text-center mt-4">N'oublie pas de présenter votre ticket lors du voyage</p>
          {sp.get('skip') && <p className="text text-center mt-4">Pour retélécharger votre ticket, veuillez cliquer <button className='text-indigo-500 underline' onClick={() => downloadPdf()}>ici !</button></p>}
        </div>
      )}
    </section>
  )
}

export default TripDetails