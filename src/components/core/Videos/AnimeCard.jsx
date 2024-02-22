import React from 'react'

const AnimeCard = ({image, releaseDate, title}) => {
  return (
    <div className='text-white w-11/12 h-11/12'>
        <img src={image} alt="" 
            className='w-[500px] h-[370px] object-contain'
        />
        <h2>{title}</h2>
        <p>{releaseDate}</p>
    </div>
  )
}

export default AnimeCard