import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
const Rating = ({value, color}) => {
  const fullStar = Math.floor(value)
  const halfStar = value - fullStar >= 0.3 ? 1 : 0
  const emptyStar = 5 - fullStar - halfStar


   return (
    <div className="flex items-center"> 
      {[...Array(fullStar)].map((_, index) => (
         <FaStar size={24} key={index} className={`text-${color}-300 ml-1`}/>
      ))}
      {halfStar === 1 && <FaStarHalfAlt size={24} className={`text-${color}-300 ml-1`} />}
      {[...Array(emptyStar)].map((_, index) => (
         <FaRegStar size={24} key={index} className={`text-${color}-300 ml-1`}/>
      ))}
    </div>
  )
}

export default Rating