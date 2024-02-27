import React, { useEffect, useState } from 'react'
import Comments from '../components/common/Comments'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { loadData } from '../utils/animeAPI/anime'
import { getContentDetails } from '../services/operations/contentAPI'
import toast from 'react-hot-toast'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import {Autoplay, Pagination, Navigation } from 'swiper/modules';
import Button from '../components/common/Button'
import { BsFillPlayFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import AnimeCard from '../components/core/Videos/AnimeCard'
import Navbar from '../components/common/Navbar'
import { buyContent } from '../services/operations/paymentAPI'

const VideoDetails = () => {
    const {videoId} = useParams()
    const [animeOrArtistContent, setAnimeOrArtistContent] = useState(null);
    const {allContentAndAnime} = useSelector((state) => state.content);
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isArtistContent = localStorage.getItem("isArtistContent");
    const fetchData = async() => {
      let data = {
        title: "",
        englishName: "",
        description: "",
        image: "",
        genre: "",
        tag: "",
        releasedDate: "",
        status: "",
      };

      if(isArtistContent === 'true') {
        const artistContent = await getContentDetails(videoId);

        data.title = artistContent.contentName;
        data.description = artistContent.contentDescription;
        data.image = artistContent.thumbnail;
        data.genre = artistContent.genre?.name;
        data.tag = artistContent.tag;
        data.releasedDate = artistContent.createdAt;
        data.status = "Ongoing";
        data.price = artistContent?.price;
      } 

      if(isArtistContent === 'false') {
        const animeData = await loadData();
        console.log("ANIME DATA...", animeData);
        data['title'] = animeData?.title?.userPreferred ? animeData?.title?.userPreferred : animeData?.name;
        data['englishName'] = animeData?.english ? animeData?.english : animeData?.other_name?.split(',') ;
        data['description'] = animeData?.description;
        data['image'] = animeData?.coverImage?.large ? animeData?.coverImage?.large : animeData?.image;
        data['genre'] = animeData?.genre?.split(",")[0];
        data['tag'] = animeData?.tag ? animeData?.tag : animeData?.genre?.split(",") ;
        data['releasedDate'] = animeData?.seasonYear ? animeData?.seasonYear : animeData?.released; 
        data['status'] = animeData?.status;
        data['videos'] = animeData?.episodes;

      }
      setAnimeOrArtistContent(data)
    }

    const handleBuyCourse = () => {
      if(token) {
        buyContent(token, [videoId], user, navigate, dispatch);
        return;
      } else {

      }
    }

    useEffect(() => {
      fetchData();
    }, [])

    return (
    <div className='text-white w-full bg-[#000814]'>
      {/* Navbar */}
      <div className='absolute top-0 z-50'>
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className='container flex items-center relative text-white h-[100vh] bg-slate-800'>
        <div className='h-full w-full '>    
          <div className='absolute w-full h-full before:absolute before:text-8xl before:text-white 
          before:content-[""] before:w-full before:h-full before:bg-black before:opacity-50
          flex justify-center items-center'
          >
            <img 
            autoPlay
            loop
            src={animeOrArtistContent?.image}
            className='w-full h-full object-cover'
            />

            <div className='absolute left-0 top-0 h-full flex items-center  bg-gradient-to-r from-[rgba(0,0,0,0.85)] to-transparent bg-opacity-0
              pl-20 w-[55%]
            '>
              <div className='z-50 flex gap-x-5 items-start left-20 '>
                <img 
                  src={animeOrArtistContent?.image} 
                  alt={animeOrArtistContent?.title} 
                  className='rounded-lg object-contain w-60 '
                />
                <div className='z-50 w-[70%] flex flex-col justify-between items-start gap-y-3'>
                  
                  <h2 className='text-3xl font-poppins w-full'>{animeOrArtistContent?.title}</h2>
                  <p className='text-lg opacity-50 leading-5 w-[80%] font-lato'>
                    {animeOrArtistContent?.description}
                  </p>

                  <div className='flex gap-2 items-center'>
                    <p className='font-poppins'>Genre:</p>
                    <p className='text-sm text-gray-400 font-roboto'>
                      {animeOrArtistContent?.genre}
                    </p>
                  </div>

                  <div className='flex gap-2 items-start'>
                    <p className='font-poppins'>Tags:</p>
                    <div className='flex flex-wrap w-full gap-2'>
                      {animeOrArtistContent?.tag && animeOrArtistContent?.tag?.map((name, index) => (
                        <p key={index} 
                          className='text-sm text-gray-400 font-roboto px-2 rounded-full border border-white py-1 text-center'
                        >
                          {name.trim()}
                        </p>
                      ))} 
                    </div>
                  </div>

                  <div className='flex gap-2 items-center'>
                    <p className='font-poppins'>Status:</p>
                    <div className='flex gap-2 text-sm text-gray-400 font-roboto'>
                      {animeOrArtistContent?.status}
                    </div>
                  </div>

                  <div className='flex gap-2 items-center'>
                    <p className='font-poppins'>Total Episodes:</p>
                    <div className='flex gap-2 text-sm text-gray-400 font-roboto'>
                      {animeOrArtistContent?.videos?.length ? animeOrArtistContent?.videos.length : animeOrArtistContent?.videos  }
                    </div>
                  </div>
                  
                  <div className='flex gap-2 items-center'>
                    <p className='font-poppins'>Price:</p>
                    <div className='flex gap-2 text-lg text-white font-roboto'>
                      ₹{animeOrArtistContent?.price}
                    </div>
                  </div>

                  <Button 
                    text={isArtistContent === 'true' ? "Buy Now" : "Watch Now"}
                    handleOnClick={isArtistContent ? handleBuyCourse : "" }
                    customClasses={`mt-4`}
                  >
                      <BsFillPlayFill />
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <div className='mt-9'>
        <Comments />
      </div>

      {/* Content and Anime Slider */}
      <div className='mt-9 flex flex-col gap-y-6 w-full'>
        {/* Popular */}
        <div
          className='flex flex-col gap-y-6 px-10 mt-9 w-full'
        >   
            <div>
                <h2 className='text-white text-4xl font-semibold font-lato'>
                    Popular
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
                        className='pl-2'
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
                          handleOnClick={() => {
                            localStorage.setItem("isArtistContent", false);
                            navigate(`/video/${anime?.id}`)
                            window.location.reload();
                          }}
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
                                  localStorage.setItem("isArtistContent", true);
                                  navigate(`/video/${anime?._id}`);
                                  window.location.reload();
                                }}
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
                                handleOnClick={() => {
                                  localStorage.setItem("isArtistContent", false);
                                  navigate(`/video/${anime?.id}`);
                                  window.location.reload();
                                }} 
                            />
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
        </div>
        
        
          
      </div>
      
      
    </div>
  )
}

export default VideoDetails