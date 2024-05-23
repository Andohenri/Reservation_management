import { FaGithub, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa"
import { Link } from "react-router-dom"

const Footer = () => {
   return (
      <footer className="w-full bg-[#07143F] bg-opacity-90 backdrop-blur-lg text-gray-200">
         <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-4 max-w-5xl mx-auto items-center py-2 px-2">
            <div className="flex flex-col gap-2 justify-center items-center">
               <p className="text-base font-semibold"><Link to={'/info-politics?termsofuse'}>Conditions d'utilisation</Link> | <Link to={'/info-politics?politics'}>Politique de confidentialité</Link></p>
               <p className="text-base font-semibold">&copy; 2024 by DjangoBona. Tous droits réservés</p>
            </div>
            <div className="flex flex-col lg:flex-row  items-center gap-4">
               <div>
                  <h1 className="shadow-white">
                     <span className='bg-gradient-to-r from-[#FAB440] to-[#4E47C6] text-lg md:text-2xl font-bold py-0.5 px-2 rounded-lg'>
                        Train-Trip
                     </span>
                  </h1>
               </div>
               <div className="flex gap-4">
                  <Link className="p-1 rounded-full bg-white">
                     <FaYoutube color="#CD201F" size={24} />
                  </Link>
                  <Link className="p-1 rounded-full bg-white">
                     <FaWhatsapp color="#25D366" size={24} />
                  </Link>
                  <Link className="p-1 rounded-full bg-white">
                     <FaGithub color="#24292e" size={24} />
                  </Link>
                  <Link className="p-1 rounded-full bg-white">
                     <FaLinkedin color="#0A66C2" size={24} />
                  </Link>
               </div>

            </div>
         </div>
      </footer>
   )
}

export default Footer