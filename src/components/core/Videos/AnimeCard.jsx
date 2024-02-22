import React, { useState } from 'react'
import { FaPlay } from "react-icons/fa";

const AnimeCard = ({image, releaseDate, title, meanScore}) => {
  const [playHover, setPlayHover] = useState(false); 

  return (
    <div className='text-white h-[500px] w-11/12 h-11/12 rounded-lg shadow-pink-600 shadow-[0_0_12px_1px] my-3 pb-3'>

      <div
        className='relative group'
      >
        <img src={image} alt="" 
          className={`w-[500px] h-[370px] rounded-t-lg group-hover:opacity-0 opacity-100 group-hover:delay-700 transition-all duration-300`} 
        />

        <img 
          src="https://firebasestorage.googleapis.com/v0/b/septron-909d2.appspot.com/o/Septron%2FGifs%2FTanjiro%20Demon%20Slayer%20GIF%20-%20Tanjiro%20Demon%20Slayer%20Kimetsu%20No%20Yaiba%20-%20Discover%20%26%20Share%20GIFs.gif?alt=media&token=4d274762-b220-4f79-a263-ef9ab43f0e5c" 
          alt="" 
          className={`${playHover ? "opacity-100" : ""} group-hover:opacity-100 group-hover:grayscale group-hover:delay-700 
            transition-all duration-300 opacity-0 absolute top-0 h-full w-full object-fill`}
        />
      </div>

      <div className='relative top-3 px-2 flex justify-between items-start'>
        <div className='w-full px-3'>
          <h2 className='w-48 font-roboto text-base'>{title}</h2>
          <div className='flex justify-between py-4 font-poppins text-sm'>
            <p>{releaseDate}</p>
            {meanScore && (<p>⭐{meanScore/10}/10</p>)}
          </div>
        </div>

        <button
          onMouseEnter={() => setPlayHover(true)}
          onMouseLeave={() => setPlayHover(false)}
          className='bg-pink-700 hover:bg-pink-500 p-4 rounded-full flex justify-center items-center absolute -top-8 right-2'
        >
          <FaPlay />
        </button>
      </div>
    </div>
  )
}

export default AnimeCard