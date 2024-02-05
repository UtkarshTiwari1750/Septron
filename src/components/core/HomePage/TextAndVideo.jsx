import React from 'react'
import Button from '../../common/Button'
import { useNavigate } from 'react-router-dom';

const TextAndVideo = ({textHeading, textSubHeading, buttonText, buttonIcon, videoUrl, reverse}) => {
    const navigate = useNavigate();

  return (
    <div className={`flex justify-between items-center mx-auto w-11/12 max-w-[1380px] px-5 gap-x-10
        ${reverse ? "flex-row-reverse" : ""}
    `}>

        <div className='text-white flex flex-col items-start gap-y-6 w-[45%]'>
          <h2 className='headingText'>
            {textHeading}
          </h2>

          <p className='subheadingText'>
            {textSubHeading}             
          </p>

          <Button
            handleOnClick={() => navigate('/content/shows')} 
            customClasses={`mt-8`} 
          >
            <p>{buttonText}</p>
            {buttonIcon}
          </Button>
        </div>

        <div className='w-[45%]'>
          <video src={videoUrl} 
            autoPlay
            loop 
            className='rounded-lg'
            muted
          />
        </div>

    </div>
  )
}

export default TextAndVideo