import React, {Suspense} from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import {BsFillPlayFill} from 'react-icons/bs'
import Button from '../../common/Button';
import Navbar from '../../common/Navbar';
// const Spline = React.lazy(() => import('@splinetool/react-spline'));
// import Spline from '@splinetool/react-spline';
import { heroData } from '../../../data/heroData';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import {Autoplay, Pagination, Navigation } from 'swiper/modules';

const Hero = () => {
  
  return (

    <div className='container flex items-center relative text-white h-[100vh] bg-slate-800'>
      {/* <Card /> */}
        
      <div className='container flex items-center relative text-white h-[100vh] bg-slate-800'>
        <Swiper className='h-full w-full mySwiper'
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          loop={true}
        >
          {
            heroData.map((hero, index) => (
              <>
                <SwiperSlide 
                  key={index}
                >
                  <div className='absolute w-full h-full before:absolute before:text-8xl before:text-white 
                  before:content-[""] before:w-full before:h-full before:bg-black before:opacity-50
                  flex justify-center items-center'
                  >
                    <video 
                      autoPlay
                      loop
                      src={hero.gif}
                      className='w-full h-full object-cover'
                      onLoad={true}
                      muted
                    />
                    <div className='z-50 w-[70%] mx-auto flex flex-col justify-between items-start gap-y-4 absolute '>
                      <h2 className='text-5xl font-poppins'>{hero.heading}</h2>
                      <p className='text-3xl opacity-50 leading-5 w-[50%] font-nanum'>
                        {hero.subHeading}
                      </p>
                      <Button text='Watch Now'
                      customClasses={`mt-6`}>
                        <BsFillPlayFill />
                      </Button>
                    </div>

                    <div className='absolute flex gap-x-5 right-24 xl:opacity-100 opacity-0 '>
                      <img 
                        src={index+1 >= heroData.length ? heroData[0].image : heroData[index+1].image} 
                        alt={hero.heading} 
                        className='rounded-lg'
                      />
                      <img src={index+2 >= heroData.length ? heroData[1].image : heroData[index+2].image} 
                        alt={hero.heading} 
                        className='rounded-lg' 
                      />
                      <img src={index+3 >= heroData.length ? heroData[2].image : heroData[index+3].image} 
                        alt={hero.heading} 
                        className='rounded-lg'
                      />
                    </div>
                    
                  </div>
                </SwiperSlide>
              </>
            ))
          }
        </Swiper>
        
      </div>
      
      
      
      {/* <div>
        <Suspense fallback={<div className='text-white text-5xl'>Loading...</div>}>
          <Spline scene="https://prod.spline.design/CzeXkC-ZMCuGT3lH/scene.splinecode" 
          onLoad={onLoad}
          className='w-[45px] h-[45px]'/>
        </Suspense>
        <button type="button" onClick={triggerAnimation}>
        Trigger Spline Animation
      </button>
      </div> */}

    </div>
  )
}

export default Hero