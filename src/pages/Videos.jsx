import React, { useEffect, useState } from 'react'
import {getAllContent} from "../services/operations/contentAPI"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import {Autoplay, Pagination, Navigation } from 'swiper/modules';
import Button from '../components/common/Button';
import { BsFillPlayFill } from 'react-icons/bs';
import { heroData } from '../data/heroData';
import Navbar from '../components/common/Navbar';
import Card from '../components/common/Card';

const Videos = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        ;(async() => {
            try {
                const result = await getAllContent();
                if(result) {
                    setVideos(result);
                }
            } catch(error) {
                console.log("Error in Videos Component...", error);
            }
        })()
        
    }, []);

  return (
    <div className='bg-[#000814]'>
        <div className='absolute top-0 z-50'>
            <Navbar />
        </div>

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
                        <div className='z-50 absolute flex w-[70%] gap-x-5 items-center left-20'>
                            <img 
                                src={heroData[index].image} 
                                alt={hero.heading} 
                                className='rounded-lg object-contain'
                            />
                            <div className='z-50 w-[70%] flex flex-col justify-between items-start gap-y-3'>
                                
                                <h2 className='text-5xl font-poppins'>{hero.heading}</h2>
                                <p className='text-3xl opacity-50 leading-5 w-[50%] font-nanum'>
                                    {hero.subHeading}
                                </p>
                                <Button text='Watch Now'
                                customClasses={`mt-4`}>
                                    <BsFillPlayFill />
                                </Button>
                            </div>

                        </div>
                    </div>
                    </SwiperSlide>
                </>
                ))
            }
            </Swiper>
        </div>
        
        <section className='text-white w-11/12 mx-auto px-4'>
            <h2>
                Trending
            </h2>

            <Card 
                image={}
            />

        </section>
    
    </div>
  )
}

export default Videos