import { FaGithub, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa"

const Footer = () => {
  return (
   <footer className="w-full bg-[#07143F] bg-opacity-90 backdrop-blur-lg text-gray-200">
      <div className="flex justify-between max-w-5xl whitespace-normal mx-auto items-center py-2 px-2">
         <div>
            <p className="text-base font-semibold ">&copy; 2024. Tous droits réservés</p>
            <p className="text-base font-semibold ">Conditions d'utilisation | Politique de confidentialité</p>
         </div>
         <div className="flex gap-1 sm:gap-4">
            <div className="p-1 rounded-full bg-white cursor-pointer">
               <FaYoutube color="#CD201F" size={24}/>
            </div>
            <div className="p-1 rounded-full bg-white cursor-pointer">
               <FaWhatsapp color="#25D366" size={24}/>
            </div>
            <div className="p-1 rounded-full bg-white cursor-pointer">
               <FaGithub color="#24292e" size={24}/>
            </div>
            <div className="p-1 rounded-full bg-white cursor-pointer">
               <FaLinkedin color="#0A66C2" size={24}/>
            </div>
         </div>
      </div>
   </footer>
  )
}

export default Footer