import React from 'react'
import Button from '../../common/Button'
import { useNavigate } from 'react-router-dom';

const TextAndVideo = ({textHeading, textSubHeading, buttonText, buttonIcon, videoUrl, reverse, navigateUrl}) => {
    const navigate = useNavigate();

  return (
    <div className={`flex justify-between items-center mx-auto w-11/12 max-w-[1380px] px-5 gap-x-10
        ${reverse ? "flex-row-reverse" : ""}
    `}>

        <div className='text-white flex flex-col items-start gap-y-6 w-[45%] font-roboto'>
          <h2 className='headingText'>
            {textHeading}
          </h2>

          <p className='subheadingText font-raleway'>
            {textSubHeading}             
          </p>

          <Button
            handleOnClick={() => navigate(navigateUrl)} 
            customClasses={`mt-8`} 
          >
            <p>{buttonText}</p>
            {buttonIcon}
          </Button>
        </div>

        <div className='w-[45%] relative group'>
          <div className="absolute -inset-0.5 animate-tilt opacity-75 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur-lg "></div>
          <video src={videoUrl} 
            autoPlay
            loop 
            className='rounded-lg relative'
            muted
          />
        </div>

    </div>
  )
}

export default TextAndVideo