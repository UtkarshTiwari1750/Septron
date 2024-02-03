import React from 'react'

const Button = ({text,handleOnClick, children, customClasses, disabled}) => {
  return (
    <button className={`font-Roboto flex items-center border-white border px-3 py-1 rounded-md w-[18%] ${customClasses}`}
    onClick={handleOnClick}
    disabled={disabled}
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