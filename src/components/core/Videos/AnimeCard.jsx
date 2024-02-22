import React from 'react'
import { FaPlay } from "react-icons/fa";

const AnimeCard = ({image, releaseDate, title, meanScore}) => {
  return (
    <div className='text-white h-[480px] w-11/12 h-11/12 rounded-lg shadow-pink-600 shadow-[0_0_12px_1px] my-3 pb-3'>
        <img src={image} alt="" 
          className='w-[500px] h-[370px]  rounded-t-lg '
        />
        <div className='relative top-3 px-2 flex justify-between items-start'>
          <div className='w-full px-3'>
            <h2 className='w-40'>{title}</h2>
            <div className='flex justify-between py-4 '>
              <p>{releaseDate}</p>
              <p>⭐{meanScore/10}/10</p>
            </div>
          </div>

          <button className='bg-pink-700 p-4 rounded-full flex justify-center items-center absolute -top-7 right-2'>
            <FaPlay />
          </button>
        </div>
    </div>
  )
}

export default AnimeCard