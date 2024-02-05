import React, {Suspense, useEffect} from 'react'
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
import Hero from '../components/Hero';
import { getAllContentName } from '../services/operations/contentAPI';

import { PageFlip } from 'page-flip';

// const Spline = React.lazy(() => import('@splinetool/react-spline'));
// import Spline from '@splinetool/react-spline';



const Home = () => {
  const navigate = useNavigate();
  const settings = {
    width: 400,
    height: 600,
    size: "fixed" 
  }

  const pageFlip = new PageFlip(document.querySelector('.page'), settings);
  pageFlip.loadFromImages(["https://firebasestorage.googleapis.com/v0/b/septron-909d2.appspot.com/o/Septron%2FImages%2FFirst.png?alt=media&token=170422a6-e139-4f71-9d67-633b5c0a6353"],
  ["https://firebasestorage.googleapis.com/v0/b/septron-909d2.appspot.com/o/Septron%2FImages%2FFirst.png?alt=media&token=170422a6-e139-4f71-9d67-633b5c0a6353"]
  ["https://firebasestorage.googleapis.com/v0/b/septron-909d2.appspot.com/o/Septron%2FImages%2FFirst.png?alt=media&token=170422a6-e139-4f71-9d67-633b5c0a6353"]
  );

  return (
    <div className='bg-[#1e1e1e] flex flex-col gap-5'>

      {/* Hero Section */}
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
          </p>
          <Button text='Watch Now' icon={<BsFillPlayFill />} />
        </div>
      </div>

      {/* Video Section */}
      <div className='flex justify-between items-center mx-auto w-11/12 max-w-[1320px]'>

        <div className='text-white'>
          <h2 className='headingText'>
            Watch Your Favourite Shows
          </h2>

          <p className='subheadingText'>
            Do you enjoy watching anime to help you relax after a hectic day? 
            Rather than wasting time searching for your favorite shows online, 
            why not start watching now and enter into a dream universe of your own?              
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

      {/* Book Section */}
      <div className='flex justify-between items-center mx-auto w-11/12 max-w-max'>

        <div className='text-white'>
          <h2 className='headingText'>
            Read All Your Favourite Books
          </h2>

          <p className='subheadingText'>
            Some people suggest that “reading books helps to gain knowledge 😒, ok no offense! 
            However, reading comics can helps to gain knowledge, be beneficial in understanding relationships, 
            exploring the world 🌍, and improving one's personality. 😊          
          </p>

          <Button
            text="Watch Now"
            handleOnClick={() => navigate('/content/shows')}              
          >
            <MdMenuBook />
          </Button>
        </div>

        <div className='page'>
          
          {/* <video 
            autoPlay
            src="https://firebasestorage.googleapis.com/v0/b/septron-909d2.appspot.com/o/Septron%2FGifs%2FBookFlip.mp4?alt=media&token=12ac236a-e1d3-4436-90c7-7654e9c30f6b"
            loop
            className=''
          >
          </video> */}

        </div>

      </div>


          {/* <iframe src="https://publuu.com/flip-book/386453/876881/page/1?embed" width="100%" height="380" scrolling="no" frameborder="0" allowfullscreen="" allow="clipboard-write" class="publuuflip"></iframe>

          <a href="https://online.flippingbook.com/view/883434519/" 
          class="fbo-embed" data-fbo-id="7f6d46422b"
           data-fbo-ratio="3:2" data-fbo-lightbox="yes" data-fbo-width="100%" data-fbo-height="auto" data-fbo-version="1" 
           className='max-w-full'>png2pdf (1)</a><script async defer src="https://online.flippingbook.com/EmbedScriptUrl.aspx?m=redir&hid=883434519"></script> */}

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