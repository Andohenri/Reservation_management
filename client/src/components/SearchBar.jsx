import React from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchBar = ({value, handleSearch}) => {
   return (
      <div className='relative'>
         <input className='input_search' type="text" value={value} onChange={handleSearch} placeholder='Rechercher...'/>
         <span className='absolute top-3 right-3 lg:right-14 pointer-events-none'><FaSearch className='text-gray-400'/></span>
      </div>
   )
}

export default SearchBar