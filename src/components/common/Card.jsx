import React, { useRef, useState } from 'react'
import Demon from "../../assets/gif/Tanjiro Demon Slayer GIF - Tanjiro Demon Slayer Kimetsu No Yaiba - Discover & Share GIFs.gif"
import DemonSlayer from "../../assets/png/DemonSlayer.jfif"
import { useEffect } from 'react';
// import "./Card.css"



const Card = () => {
  const demon = useRef(null);
  const demonslayer = useRef(null);
  const [isGrayScale, setIsGrayScale] = useState(true);

  function changeGrayscale(state){
    // const demon = document.querySelector(".c-demon");
    // const demonslayer = document.querySelector('.c-demonslayer');
    

    console.log(state + "Element : " + demon);
    if(demon.current && demonslayer.current){

      console.log("DEMON..", demon.current.className);
      console.log("DEMONSLAYER..", demonslayer.current.className);

      if(state === 'Enter' ){
        // demon.current.className.remove('opacity-0');
        // demonslayer.current.className.remove('opacity-100');
        demon.current.className.add('opacity-100');
        // demonslayer.className.add('opacity-0');
        // demon.current.className.remove('grayscale');
        demon.current.className.add('grayscale-0');
      }
      else{
        demon.current.className.add('opacity-0');
        // demonslayer.current.className.add('opacity-100');
        // demon.current.className.remove('opacity-100');
        // demonslayer.current.className.remove('opacity-0');
        // demon.current.className.remove('grayscale-0');
        demon.current.className.add("grayscale");
      }
    }
  }
  
  return (
    <div className='w-[250px] h-[380px] flex flex-col items-center justify-center pl-4'>
      <div className='w-full h-full relative rounded-2xl group'>
          <img src={DemonSlayer} alt="" ref={demonslayer}
          className={`${isGrayScale ? "opacity-100" : "opacity-0 "} h-full w-full rounded-2xl absolute group-hover:opacity-0 opacity-100 object-fill transition-all duration-500`}/>

          <img src={Demon} alt="" ref={demon}
          className={`${isGrayScale ?"grayscale opacity-0" : "grayscale-0 opacity-100"} h-full w-full rounded-2xl absolute opacity-0 group-hover:opacity-100 grayscale object-fill transition-all duration-500`}/>
      </div>
      <div className='flex justify-between items-center w-full text-white '>
        <div className='w-[50%]'>
          <h2 
          className='text-lg opacity-80 text-left'>
            Demon Slayer
          </h2>
          
          <p 
          className='text-left text-[10px]'>
              Lorem ipsum dolor sit amet .
          </p>
        </div>

        <button 
        className='c-button opacity-75 px-3 py-2 rounded-lg grayscale hover:grayscale-0
        relative before:content-none   before:blur-md 
        before:w-[100%] before:h-[100%] before:animate-glow 
        hover:before:opacity-100 before:bg-slate-200 
        ' 
        onMouseEnter={() => setIsGrayScale(false)}
        onMouseLeave={() => setIsGrayScale(true)}
        >
          Watch Now
        </button>

      </div>
      <div className='before:absolute before:bg-white before:top-[-2px] before:left-[-2px] before:bg-[400%] before:z-50 before:opacity-0  before:bg-gradient-to-r from-[rgba(104,95,241,1)] via-[rgba(177,16,204,1)] to-[rgba(0,212,255,1)]'></div>
    </div>
  )
}

export default Card