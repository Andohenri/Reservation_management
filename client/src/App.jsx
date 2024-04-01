import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Footer from './components/Footer'
import Header from './components/Header'

export default function App() {
  return (
    <>
      <div className='main'>
        <div className='gradient' />
      </div>
      <main className='min-h-screen flex flex-col'>
        <Header />
        <div className='w-full flex-1 z-10 max-md:mt-8'>
          <Outlet />
        </div>
        <Footer />
      </main>
      <ToastContainer />
    </>
  )
}
