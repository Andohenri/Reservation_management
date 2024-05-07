import React, { useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaMapMarkerAlt, FaMapPin, FaSearch, FaSearchLocation, FaStar } from 'react-icons/fa'
import { Ri24HoursLine, RiMenuSearchFill, RiSecurePaymentLine, RiTimeLine } from 'react-icons/ri'
import { MdAdsClick, MdOutlinePartyMode, MdOutlinePayments, MdShoppingCartCheckout } from 'react-icons/md'
import Banner from '../assets/banner.jpeg'
import Img1 from '../assets/train1.png'
import step1 from '../assets/1.png'
import step2 from '../assets/2.png'
import step3 from '../assets/3.png'
import step4 from '../assets/4.png'
import react from '../assets/react.svg'
import { setSearchQuery } from '../redux/features/trip/tripSlice'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import { register } from 'swiper/element/bundle'
register()

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [dateDepart, setDateDepart] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery({ departure_date: dateDepart, origin, destination }));
    navigate('/trip');
  }

  return (
    <main className='max-w-6xl mx-auto'>
      <header className='flex justify-center items-center gap-6 sm:p-6 sm:h-[85vh] mb-6'>
        <div className='hidden sm:flex flex-col gap-6 justify-center items-start max-md:text-center'>
          <h1 className='head_text'>Bienvenue sur TRAIN-TRIP - Votre plateforme ultime de réservation de train !</h1>
          <p className='desc'>
            Dites adieu aux longues files d'attentes et aux tracas de réservation de dernier minutes -
            TRAIN-TRIP est là pour rendre votre expérience de voyage agréable et sans stresse.
          </p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <section className='grid grid-cols-3 items-center'>
              <div className='relative'>
                <input value={origin} onChange={(e) => setOrigin(e.target.value)} className='w-full shadow border rounded-tl-lg rounded-bl-lg focus:border-[#4E47C6] py-2 pl-3 pr-8 text-gray-700 focus:outline-none transition-all pointer-events-auto placeholder:italic' type="text" placeholder='Ville de départ' />
                <span className='absolute top-3 right-3 pointer-events-none'><FaMapPin className='text-gray-400' /></span>
              </div>
              <div className='relative'>
                <input value={destination} onChange={(e) => setDestination(e.target.value)} className='w-full shadow border focus:border-[#4E47C6] py-2 pl-3 pr-8 text-gray-700 focus:outline-none transition-all pointer-events-auto placeholder:italic' type="text" placeholder="Ville d'arrivé" />
                <span className='absolute top-3 right-3 pointer-events-none'><FaMapMarkerAlt className='text-gray-400' /></span>
              </div>
              <div className='relative hidden sm:block'>
                <input value={dateDepart} onChange={(e) => setDateDepart(e.target.value)} className='w-full shadow border rounded-tr-lg rounded-br-lg focus:border-[#4E47C6] py-2 pl-3 pr-4 text-gray-700 leading-tight focus:outline-none transition-all pointer-events-auto placeholder:italic' type="date" />
              </div>
            </section>
            <div className='flex justify-end'>
              <button type='submit' className='bg-[#FAB440] text-white shadow rounded-lg px-3 py-2 flex gap-2 items-center'>
                <FaSearch size={24} />
                <span className='font-semibold'>Rechercher</span>
              </button>
            </div>
          </form>
          <div className='flex shadow gap-4 items-center bg-white py-2 px-4 rounded-lg'>
            <span className='flex gap-1'><FaStar size={24} style={{ color: 'yellow' }} /><FaStar size={24} style={{ color: 'yellow' }} /><FaStar size={24} style={{ color: 'yellow' }} /><FaStar size={24} style={{ color: 'yellow' }} /><FaStar size={24} style={{ color: 'yellow' }} /></span>
            <p className='desc'><span className='font-bold'>4.8</span> sur 114 reviews</p>
          </div>
        </div>
        <div className='relative shadow-lg sm:rounded-lg overflow-hidden'>
          <img src={Banner} alt="logo" className='' />
          <div className='absolute_center w-[70%] sm:hidden text-center'>
            <h1 className='text-2xl text-shadow font-extrabold leading-[1.15] text-white'>Bienvenue sur TRAIN-TRIP! <br /> Votre plateforme ultime de réservation de train !</h1>
            <button onClick={() => navigate('/trip')} className='btn_primary mx-auto mt-2 uppercase'>Réserver maintenant</button>
          </div>
        </div>
      </header>
      <section className='p-6'>
        <h1 className='head_text mb-6'>A propos se Train-trip</h1>
        <div className='grid gap-6 sm:grid-cols-2'>
          <div className='overflow-hidden rounded-lg h-[18rem]'>
            <img src={Img1} alt="train" />
          </div>
          <p className='desc'>
            Découvrez une expérience de réservation fluide et sans souci avec TRAIN-TRIP.
            Que vous voyagiez pour affaires un court trajet ou un long voyage, notre interface conviviale vous permet de rechercher des voyages disponibles en Train
            de consulter les horaires de départ ou d'arrivée et réserver vos billets de train en toutes simplicité.
            Avec notre système complet, vous pouvez également gérer votre réservation, suivre votre trajet et rester informé en temps réel.
            Réjoignez-nous et profitez d'une expériencede voyage sans faille avec notre service de réservation de train.
          </p>
        </div>
      </section>
      <section className='p-6'>
        <h1 className='head_text mb-6'>Pourquoi réserver des trains sur sur Train-Trip ?</h1>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <article className='bg-white flex flex-col gap-4 rounded-lg shadow p-4'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-yellow-200 rounded-lg'><MdAdsClick size={32} className='text-[#FAB440]' /></div>
              <h1 className='text-xl text-gray-800 font-bold'>Réservation facile</h1>
            </div>
            <div>
              <p className='desc'>
                En quelques clics, réserver vos billets de train et recevez une confirmation instantanée.
              </p>
            </div>
          </article>
          <article className='bg-white flex flex-col gap-4 rounded-lg shadow p-4'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-yellow-200 rounded-lg'><RiTimeLine size={32} className='text-[#FAB440]' /></div>
              <h1 className='text-lg text-gray-800 font-bold'>Mise à jour en temps réel</h1>
            </div>
            <div>
              <p className='desc'>
                Rester informé de votre voyage avec des mises en temps réel sur les horaires des trains, les retards et plus encore.
              </p>
            </div>
          </article>
          <article className='bg-white flex flex-col gap-4 rounded-lg shadow p-4'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-yellow-200 rounded-lg'><RiSecurePaymentLine size={32} className='text-[#FAB440]' /></div>
              <h1 className='text-lg text-gray-800 font-bold'>Paiement sécurisé</h1>
            </div>
            <div>
              <p className='desc'>
                Notre passerele de paiement sécurisé garantit que vos transactions sont sures et protégés.
              </p>
            </div>
          </article>
          <article className='bg-white flex flex-col gap-4 rounded-lg shadow p-4'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-yellow-200 rounded-lg'><Ri24HoursLine size={32} className='text-[#FAB440]' /></div>
              <h1 className='text-lg text-gray-800 font-bold'>Service client 24/7</h1>
            </div>
            <div>
              <p className='desc'>
                Notre équipe de support client dévouée est disponible 24h/24 et 7j/7 pour vous aider avec toutes vos questions ou problèmes.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className='p-6'>
        <h1 className='head_text mb-6'>Comment ça marche ?</h1>
        <div className='py-6 relative'>
          <swiper-container
            navigation="true"
            navigation-clickable="true"
            navigation-next-el=".swiper-button-next"
            navigation-prev-el=".swiper-button-prev"
            pagination="true"
            pagination-el=".swiper-pagination"
            pagination-clickable="true"
            space-between="20"
            centered-slides="true"
            slides-per-view="1"
            effect="coverflow"
            coverflow-effect-rotate="0"
            coverflow-effect-stretch="0"
            coverflow-effect-depth="100"
            coverflow-effect-modifier="5"
            breakpoints={
              JSON.stringify({
                640: {
                  spaceBetween: 20,
                  slidesPerView: 'auto'
                }
              })
            }

          >
            <swiper-slide>
              <div className='shadow-lg relative overflow-hidden rounded-lg'>
                <span className='step'>1</span>
                <img src={step1} alt="profile" className='h-[24rem] object-cover' />
                <div className='step_desc flex gap-4 items-center -bottom-full visible_desc'>
                  <p className='text_white'>Rechercher votre destination et les dates de votre voyage en remplissant les formulaires.</p>
                  <span className='bg-white/10 rounded-lg p-4'><FaSearchLocation size={48} /></span>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div className='shadow-lg relative overflow-hidden rounded-lg'>
                <span className='step'>2</span>
                <img src={step2} alt="profile" className='h-[24rem] object-cover' />
                <div className='step_desc flex gap-4 items-center -bottom-full visible_desc'>
                  <p className='text_white'>Ensuite, prenez le temps d'explorer les différents options de voyage disponibles et idéal pour vous.</p>
                  <span className='bg-white/10 rounded-lg p-4'><RiMenuSearchFill size={48} /></span>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div className='shadow-lg relative overflow-hidden rounded-lg'>
                <span className='step'>3</span>
                <img src={step3} alt="profile" className='h-[24rem] object-cover' />
                <div className='step_desc flex gap-4 items-center -bottom-full visible_desc'>
                  <p className='text_white'>Une fois que vous avez trouvé le voyage , il vous suffit d'inclure le nombre de place que vous souhaiteriez réserver et placer la réservation.</p>
                  <span className='bg-white/10 rounded-lg p-4'><MdShoppingCartCheckout size={48} /></span>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div className='shadow-lg relative overflow-hidden rounded-lg'>
                <span className='step'>4</span>
                <img src={step4} alt="profile" className='h-[24rem] object-cover' />
                <div className='step_desc flex gap-4 items-center -bottom-full visible_desc'>
                  <p className='text_white'>C'est presque fini! Effectuer le paiement de votre réservation en toute sécurité grâce à notre système de paiement sécurisé.</p>
                  <span className='bg-white/10 rounded-lg p-4'><MdOutlinePayments size={48} /></span>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div className='shadow-lg relative overflow-hidden border rounded-lg'>
                <span className='step'>5</span>
                <img src={Img1} alt="profile" className='h-[24rem] object-cover' />
                <div className='step_desc flex gap-4 items-center -bottom-full visible_desc'>
                  <p>Enfin, une fois votre paiement confirmé, vous recevrez votre ticket par e-mail. Vous pouvez également le télécharger et l'imprimer. N'oubliez pas de le présenter lors du voyage</p>
                  <span className='bg-white/10 rounded-lg p-4'><MdOutlinePartyMode size={48} /></span>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div className='shadow-lg h-[24rem] px-10 flex gap-4 flex-col justify-center items-center bg-white relative overflow-hidden border rounded-lg'>
                <span className='step'>6</span>
                <p className='text-base lg:text-lg text-gray-600 xl:text-xl'>Pour toute question relative à ce processus, n'hesiter pas à <Link className='underline text-indigo-500' to='/contact'>nous contacter</Link></p>
                <p className='font-bold text-2xl'>OU</p>
                <button onClick={() => navigate('/trip')} className='btn_primary uppercase'>Réservez dès maintenant <FaArrowRight className='ml-2' /></button>
              </div>
            </swiper-slide>
          </swiper-container>
          <div className='slider-controler'>
            <div className="swiper-button-prev slider-arrow ">
              <FaArrowLeft size={24} className='text-indigo-500' />
            </div>
            <div className="swiper-button-next slider-arrow">
              <FaArrowRight size={24} className='text-indigo-500' />
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </section>
      <section className='p-6'>
        <h1 className='head_text mb-6'>Ce que les clients nous dites</h1>
        <div className='grid gap-4 sm:grid-cols-3'>
          <article className='bg-indigo-700 text-white rounded-lg shadow p-4'>
            <div className='flex shadow gap-4 items-center py-2 px-4 rounded-lg'>
              <span className='flex gap-1'><FaStar size={24} style={{ color: 'yellow' }} /><FaStar size={24} style={{ color: 'yellow' }} /><FaStar size={24} style={{ color: 'yellow' }} /><FaStar size={24} style={{ color: 'yellow' }} /><FaStar size={24} style={{ color: 'yellow' }} /></span>
            </div>
            <div className='p-4'>
              <p className='text-base lg:text-lg backdrop:sm:text-xl max-w-2xl'>
                "En quelques clics, réserver vos billets de train et recevez une confirmation instantanée."
              </p>
            </div>
            <div className='flex items-center p-4 gap-4'>
              <img src={react} alt="profile" className='h-10 w-10 border border-white shadow p-1 rounded-full' />
              <p className='font-bold'>Ando Henri</p>
            </div>
          </article>
          <article className='bg-[#07143F] rounded-lg shadow p-4'>
            <div className='flex shadow gap-4 items-center py-2 px-4 rounded-lg'>
              <span className='flex gap-1'><FaStar size={24} style={{ color: 'yellow' }} /><FaStar size={24} style={{ color: 'yellow' }} /><FaStar size={24} style={{ color: 'yellow' }} /><FaStar size={24} style={{ color: 'yellow' }} /><FaStar size={24} style={{ color: 'yellow' }} /></span>
            </div>
            <div className='p-4'>
              <p className='text-base lg:text-lg text-white sm:text-xl max-w-2xl'>
                "En quelques clics, réserver vos billets de train et recevez une confirmation instantanée."
              </p>
            </div>
            <div className='flex items-center p-4 gap-4'>
              <img src={react} alt="profile" className='h-10 w-10 rounded-full' />
              <p className='text-white font-bold'>Ando Henri</p>
            </div>
          </article>
          <article className='bg-[#07143F] rounded-lg shadow p-4'>
            <div className='flex shadow gap-4 items-center py-2 px-4 rounded-lg'>
              <span className='flex gap-1'><FaStar size={24} style={{ color: 'yellow' }} /><FaStar size={24} style={{ color: 'yellow' }} /><FaStar size={24} style={{ color: 'yellow' }} /><FaStar size={24} style={{ color: 'yellow' }} /><FaStar size={24} style={{ color: 'yellow' }} /></span>
            </div>
            <div className='p-4'>
              <p className='text-base lg:text-lg text-white sm:text-xl max-w-2xl'>
                "En quelques clics, réserver vos billets de train et recevez une confirmation instantanée."
              </p>
            </div>
            <div className='flex items-center p-4 gap-4'>
              <img src={react} alt="profile" className='h-10 w-10 rounded-full' />
              <p className='text-white font-bold'>Ando Henri</p>
            </div>
          </article>
        </div>
      </section>
      <section>
        <h1 className='text-2xl font-bold mb-4'>Appel a l'action</h1>
        <p>invitation claire a reserver des billets de train sur l'application - Buttons d;appel a l'action bien visible.</p>
      </section>
      <footer>
        <p>Lien vers laes pages de politique de confidentialite ,conditions d'utilisations, etc</p>
        <p>Coordonnee e contact sur l'entreprise</p>
        <p>Copyright et mentions legales</p>
      </footer>
    </main >
  )
}

export default Home