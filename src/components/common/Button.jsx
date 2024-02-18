import React from 'react'

const Button = ({text, handleOnClick, children, customClasses, disabled, type}) => {
  return (
    <button className={`${customClasses} text-lg font-roboto box-border flex relative bg-[length:400%] z-10 justify-center gap-3 items-center border-white border px-5 py-2 
      rounded-md before:bg-[length:400%] before:-top-1 before:-bottom-1 before:-left-1 before:-right-1 before:-z-10 
      before:content-[""] before:bg-gradient-to-r before:rounded-md animation from-indigo-500 via-purple-500 to-pink-500 
      transition-all duration-300 before:transition-all before:duration-300 before:opacity-0 before:absolute `}
    onClick={handleOnClick}
    disabled={disabled}
    type={type}
    >
        {
            children ? 
            (
              <>
                <span>{text}</span>
                {children}
              </>
            )
            : 
            (
              text
            )
        }
    </button>
  )
}

export default Button