import React from 'react'

const Button = ({text, icon}) => {
  return (
    <button className='font-Roboto flex items-center border-white border px-3 py-1 rounded-md w-[18%]'>
        {
            icon ? 
            (icon)
            : 
            (<span></span>)
        }
        <p>{text}</p>
    </button>
  )
}

export default Button