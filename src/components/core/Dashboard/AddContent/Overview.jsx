import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getContentDetails } from '../../../../services/operations/contentAPI';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation} from 'swiper/modules';
import NextAndPrevButton from "./NextAndPrevButton"
import { setStep } from '../../../../slices/contentSlice';
const Overview = () => {
  const {content} = useSelector((state) => state.content);
  const [overviewData, setOverviewData] = useState(null);  
  const dispatch = useDispatch();

  const handleGoBack = () => {
    dispatch(setStep(3));
  }

  useEffect(() => {
    ;(async() => {
      try {
        const result = await getContentDetails(content?._id);
        console.log("Content...", result);
        if(result) {
          setOverviewData(result);
        }

      } catch(error){
        console.log("Error in Overview Component...", error);
      }
    })()
  }, []);
  return (
    <div className='w-full pt-8 text-white'>
      <div className='text-white px-6 w-11/12 max-w-[1080px] mx-auto flex flex-col gap-y-4'>
        {/* Content Info Section */}
        <div>
          <h2 className='text-2xl'>Content Info</h2>
          <div className='flex justify-between w-full'>
            <div className='flex items-center gap-x-2'>
              <p className='font-poppins text-gray-400'>Content Name:- </p>
              <h2 className='font-roboto text-lg'>{overviewData?.contentName}</h2>
            </div>

            <div className='flex items-center gap-x-4'>
              <p className='font-poppins text-gray-400'>Thumbnail:-</p>
              <img 
                src={overviewData?.thumbnail} 
                alt="Thumbnail" 
                className='rounded-lg w-[163px] h-[122px] object-contain'
              />
            </div>
          </div>

          <div className='flex justify-between w-full'>
            <div className='flex items-center gap-x-2'>
              <p className='font-poppins text-gray-400'>Description:- </p>
              <p className='font-roboto text-lg'>{overviewData?.contentDescription}</p>
            </div>

            <div className='flex items-center gap-x-4'>
              <p className='font-poppins text-gray-400'>Content Type:-</p>
              <p className='font-roboto text-lg'>{overviewData?.contentType === 'Video'? "Anime" : "Comic"}</p>
            </div>
          </div>

          <div className='flex justify-between w-full'>
            <div className='flex items-center gap-x-2'>
              <p className='font-poppins text-gray-400'>Genre:- </p>
              <p className='font-roboto text-lg'>{overviewData?.genre?.name}</p>
            </div>

            <div className='flex items-center gap-x-4'>
              <p className='font-poppins text-gray-400'>Price:-</p>
              <p className='font-roboto text-lg'>₹{" "}{overviewData?.price}</p>
            </div>
          </div>

          <div className='flex justify-between w-full'>
            <div className='flex items-center gap-x-2'>
              <p className='font-poppins text-gray-400'>Instructions:- </p>
              <p className='font-roboto text-lg'>{overviewData?.instructions}</p>
            </div>

            <div className='flex items-center gap-x-4'>
              <p className='font-poppins text-gray-400'>Status:-</p>
              <p className='font-roboto text-lg'>{overviewData?.status}</p>
            </div>
          </div>

          <div className='flex justify-between w-full'>
            <div className='flex items-center gap-x-2'>
              <p className='font-poppins text-gray-400'>Tags:- </p>
              <p className='font-roboto text-lg'>{overviewData?.tag}</p>
            </div>

            <div className='flex items-center gap-x-4'>
              <p className='font-poppins text-gray-400'>Status:-</p>
              <p className='font-roboto text-lg'>{overviewData?.status}</p>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className='mt-3'> 
          <h2 className='text-2xl'>Gallery</h2>
          <div>
            <h2>Images</h2>
            <Swiper
              className='mySwpier flex justify-between'
              style={{
                  '--swiper-navigation-color': "#fff",
                  '--swiper-pagination-color': "#fff",
              }}
              spaceBetween={1}
              slidesPerView={3}
              navigation={true}
              grabCursor={true}
              modules={[Navigation]}
            >
                
                {   
                    overviewData?.gallery?.images?.map((link, index) => (
                        <SwiperSlide key={index}>
                            <img 
                              src={link}  
                              className='w-[250px] h-[200px] object-contain mx-auto rounded-lg '
                            />
                        </SwiperSlide>
                    ))
                }
                
            </Swiper>
          </div>

          <div>
            <h2>Videos</h2>
            <Swiper
              className='mySwpier flex justify-between'
              style={{
                  '--swiper-navigation-color': "#fff",
                  '--swiper-pagination-color': "#fff",
              }}
              spaceBetween={1}
              slidesPerView={3}
              navigation={true}
              grabCursor={true}
              modules={[Navigation]}
            >
                
              {   
                  overviewData?.gallery?.videos?.map((link, index) => (
                      <SwiperSlide key={index}>
                          <video
                            autoPlay
                            muted 
                            controls
                            src={link}  
                            className='w-[250px] h-[200px] object-contain mx-auto rounded-lg '
                          />
                      </SwiperSlide>
                  ))
              }
            </Swiper>
          </div>
        </div>
        
        <div>
          <NextAndPrevButton 
            backText="Add Section"
            handleGoBack={handleGoBack}
            nextText="Publish"
            handleNext={() => dispatch(setStep(5))}
          />
        </div>

      </div>
    </div>
  )
}

export default Overview