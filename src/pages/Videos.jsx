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
import { popularAndTrendingAnime } from '../utils/animeAPI';
import AnimeCard from '../components/core/Videos/AnimeCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllContentAndAnime } from '../slices/contentSlice';

const Videos = () => {
    const {allContentAndAnime} = useSelector((state) => state.content);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dataFetching = async() => {
        try {
            const animes = await popularAndTrendingAnime();
            const userContents = await getAllContent()
            const demonSlayer = {
                coverImage:{ 
                    medium: "https://firebasestorage.googleapis.com/v0/b/septron-909d2.appspot.com/o/Septron%2FImages%2FDemonSlayer.jpeg?alt=media&token=ec4e6361-ebc9-45e4-88ce-c9fe3b796fb7"
                },
                gif: "https://firebasestorage.googleapis.com/v0/b/septron-909d2.appspot.com/o/Septron%2FGifs%2FTanjiro%20Demon%20Slayer%20GIF%20-%20Tanjiro%20Demon%20Slayer%20Kimetsu%20No%20Yaiba%20-%20Discover%20%26%20Share%20GIFs.gif?alt=media&token=4d274762-b220-4f79-a263-ef9ab43f0e5c",
                title:{
                    english: "Demon Slayer"
                },
                meanScore: "80",
                seasonYear: "2019"
            }
            animes.Trending.unshift(demonSlayer);
            const data = {
                "artistContent": userContents,
                "popularAnimes": animes.Popular,
                "trendingAnimes": animes.Trending
            }
            dispatch(setAllContentAndAnime(data));
            localStorage.setItem("allContentAndAnime", JSON.stringify(data));
        } catch(error) {
            console.log("Error while getting Animes...", error)
        }
    }

    useEffect(() => {
        dataFetching();
    }, []);
    console.log("SESSTION DATA....", allContentAndAnime)
  return (
    <div className='bg-[#000814]'>
        {/* Navbar */}
        <div className='absolute top-0 z-50'>
            <Navbar />
        </div>

        {/* Hero Section */}
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
        
        {/* Content and Anime Slider */}
        <div className='mt-9 flex flex-col gap-y-6'>

            {/* Popular */}
            <div
                className='flex flex-col gap-y-6 px-10 mt-9'
            >   
                <div>
                    <h2 className='text-white text-4xl font-semibold font-lato'>
                        Popular
                    </h2>
                    <p className='text-base font-lato text-gray-500'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, perspiciatis! Eos, quidem! Tempore dolor, minus dolorem alias, earum porro provident a quis odit maiores corporis nemo non, ea hic officiis!
                    </p>
                </div>
                <div className='flex'>
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={5}
                        className='mySwpier flex'
                        navigation={true}
                        grabCursor={true}
                        modules={[Navigation]}
                    >

                        <SwiperSlide
                            className='pl-2 '
                        >
                            <AnimeCard
                                image={allContentAndAnime.trendingAnimes[0]?.coverImage?.medium}
                                releaseDate={allContentAndAnime.trendingAnimes[0]?.seasonYear}
                                title={allContentAndAnime.trendingAnimes[0]?.title?.english}
                            />
                        </SwiperSlide>
                        {allContentAndAnime.popularAnimes && allContentAndAnime.popularAnimes.map((anime, index) => (
                            <SwiperSlide
                                className='pl-2 '
                                key={index}
                            >
                                <AnimeCard
                                    image={anime?.image}
                                    releaseDate={anime?.releaseDate}
                                    title={anime?.title}
                                    handleOnClick={() => {navigate(`/videos/${anime?.id}`)}}
                                />
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>
            </div>

            {/* Trending */}
            <div
                className='flex flex-col gap-y-6 px-10'
            >   
                <div>
                    <h2 className='text-white text-4xl font-semibold font-lato'>
                        Trending
                    </h2>
                    <p className='text-base font-lato text-gray-500'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, perspiciatis! Eos, quidem! Tempore dolor, minus dolorem alias, earum porro provident a quis odit maiores corporis nemo non, ea hic officiis!
                    </p>
                </div>
                <div className='flex'>
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={5}
                        className='mySwpier flex'
                        navigation={true}
                        grabCursor={true}
                        modules={[Navigation]}
                    >

                        {allContentAndAnime.trendingAnimes && allContentAndAnime.trendingAnimes.map((anime, index) => (
                            <SwiperSlide
                                className='pl-2 '
                                key={index}
                            >
                                <AnimeCard
                                    image={anime?.coverImage?.medium}
                                    releaseDate={anime?.seasonYear}
                                    title={anime?.title?.english}
                                    meanScore={anime?.meanScore}
                                    handleOnClick={() => navigate(`/videos/${anime?.id}`)} 
                                />
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>
            </div>
            
            {/* Artist Content */}
            <div
                className='flex flex-col gap-y-6 px-10 mt-9 w-full'
            >   
                <div>
                    <h2 className='text-white text-4xl font-semibold font-lato'>
                        Artist Content
                    </h2>
                    <p className='text-base font-lato text-gray-500'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, perspiciatis! Eos, quidem! Tempore dolor, minus dolorem alias, earum porro provident a quis odit maiores corporis nemo non, ea hic officiis!
                    </p>
                </div>
                <div className='flex w-full'>
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={5}
                        className='mySwpier flex w-full'
                        navigation={true}
                        grabCursor={true}
                        modules={[Navigation]}
                    >

                        <SwiperSlide
                            className='pl-2 '
                        >
                            <AnimeCard
                                image={allContentAndAnime.trendingAnimes[0]?.coverImage?.medium}
                                releaseDate={allContentAndAnime.trendingAnimes[0]?.seasonYear}
                                title={allContentAndAnime.trendingAnimes[0]?.title?.english}
                            />
                        </SwiperSlide>
                        {allContentAndAnime.artistContent && allContentAndAnime.artistContent.map((anime, index) => (
                            <SwiperSlide
                                className='pl-2 '
                                key={index}
                            >
                                <AnimeCard
                                    image={anime?.thumbnail}
                                    releaseDate={anime?.createdAt.split("-")[0]}
                                    title={anime?.contentName}
                                    handleOnClick={() => {
                                        
                                        navigate(`/videos/${anime?._id}`);
                                    }}
                                />
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>
            </div>
            
        </div>
        
        {
            allContentAndAnime.artistContent && allContentAndAnime.artistContent.map((anime) => {
                console.log("ANIME NAME...", anime?.contentName);
                return (
                    <div className='text-white'>{anime?.contentName}hello</div>
                )
            })
        }

    </div>
  )
}

export default Videos