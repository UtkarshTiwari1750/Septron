import React, {Suspense, useEffect, useLayoutEffect, useRef} from 'react'
import { BiSolidMoviePlay } from "react-icons/bi";
import { MdMenuBook } from "react-icons/md";
import Hero from '../components/core/HomePage/Hero';
import TextAndVideo from '../components/core/HomePage/TextAndVideo';
import Navbar from '../components/common/Navbar';
// const Spline = React.lazy(() => import('@splinetool/react-spline'));
// import Spline from '@splinetool/react-spline';

const Home = () => {
  
  return (
    <div className='bg-[#000814] flex flex-col gap-10'>
      
      <div className='absolute top-0 z-10'>
        <Navbar />
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Video Section */}
      <div className='flex flex-col gap-y-48 my-32 '>
        <TextAndVideo 
          textHeading="Watch Your Favourite Shows"
          textSubHeading={`Do you enjoy watching anime to help you relax after a hectic day? 
              Rather than wasting time searching for your favorite shows online, 
              why not start watching now and enter into a dream universe of your own.`
          }
          buttonText="Watch Now"
          buttonIcon={<BiSolidMoviePlay />} 
          videoUrl="https://firebasestorage.googleapis.com/v0/b/septron-909d2.appspot.com/o/Septron%2FGifs%2FSoloLeveling.mp4?alt=media&token=3716d891-09c6-40d5-8308-a5909eb4aee3"
          reverse={false}
          navigateUrl="/videos"
        />

        {/* Book Section */}
        <TextAndVideo 
          textHeading="Read All Your Favourite Books"
          textSubHeading={`Some people suggest that “reading books helps to gain knowledge 😒, ok no offense! 
              However, reading comics can helps to gain knowledge, be beneficial in understanding relationships, 
              exploring the world 🌍, and improving one's personality. 😊`
          }
          buttonText="Start Reading"
          buttonIcon={<MdMenuBook />} 
          videoUrl="https://firebasestorage.googleapis.com/v0/b/septron-909d2.appspot.com/o/Septron%2FGifs%2FBookFlip.mp4?alt=media&token=12ac236a-e1d3-4436-90c7-7654e9c30f6b"
          reverse={true}
          navigateUrl="/books"
        />
      </div>
          
        
          
    </div>
    
  )
}

export default Home