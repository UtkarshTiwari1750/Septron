import React, {Suspense} from 'react'
import Card from '../components/common/Card';
import { useRef } from 'react';
import { useState } from 'react';
// import Demonbg from "../../../assets/gif/DemonSlayerbg.gif";
import Demonbg from "../assets/gif/DemonSlayerbg.gif"
import Navbar from '../components/common/Navbar';
import {BsFillPlayFill} from 'react-icons/bs'
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { BiSolidMoviePlay } from "react-icons/bi";
import { MdMenuBook } from "react-icons/md";

// const Spline = React.lazy(() => import('@splinetool/react-spline'));
// import Spline from '@splinetool/react-spline';



const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-[#1e1e1e]'>
      <div className='container flex items-center relative text-white h-[100vh] bg-slate-800'>

        <div className='absolute w-full h-full before:absolute before:text-8xl before:text-white before:content-[""] before:w-full before:h-full before:bg-black before:opacity-50'>
          <img src={Demonbg} alt="" 
            className='w-full h-full'
          />
        </div>
        <div className='absolute top-0'>
          <Navbar />
        </div>

        <div className='z-10 w-[70%] mx-auto flex flex-col justify-between gap-y-2'>
          <h2 className='text-5xl font-libre'>Watch All Animes</h2>
          <p className='text-lg opacity-50 font-Nonum leading-5'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eum quasi porro quam! Autem molestiae similique, illo quibusdam quis rem fugiat ducimus, enim, repudiandae asperiores distinctio recusandae harum inventore adipisci!
          </p>
          <Button text='Watch Now' icon={<BsFillPlayFill />} />
        </div>
      </div>

      <div className='flex justify-between items-center mx-auto w-11/12 max-w-max'>

        <div className='text-white'>
          <h2 className='headingText'>
            Watch Your Favourite Shows
          </h2>

          <p className='subheadingText'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam dolorem esse consectetur quasi voluptates ea! Voluptatibus odit, voluptatem, fugit architecto reprehenderit dolore placeat repudiandae quas facilis blanditiis ea, ipsa quisquam.
          </p>

          <Button
            text="Watch Now"
            handleOnClick={() => navigate('/content/shows')}              
          >
            <BiSolidMoviePlay />
          </Button>
        </div>

        <div>
          

        </div>

      </div>

      <div className='flex justify-between items-center mx-auto w-11/12 max-w-max'>

        <div className='text-white'>
          <h2 className='headingText'>
            Read All Your Favourite Books
          </h2>

          <p className='subheadingText'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam dolorem esse consectetur quasi voluptates ea! Voluptatibus odit, voluptatem, fugit architecto reprehenderit dolore placeat repudiandae quas facilis blanditiis ea, ipsa quisquam.
          </p>

          <Button
            text="Watch Now"
            handleOnClick={() => navigate('/content/shows')}              
          >
            <MdMenuBook />
          </Button>
        </div>

        <div>
          

        </div>

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
        {/* <Card /> */}
    </div>
    
  )
}

export default Home