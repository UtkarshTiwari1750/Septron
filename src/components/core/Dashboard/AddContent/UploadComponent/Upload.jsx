import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import DropzoneSpace from './DropzoneSpace';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import {Autoplay, Pagination, Navigation, Zoom } from 'swiper/modules';

const Upload = ({
    name,
    label,
    register,
    setValue,
    errors,
    customIcon,
    video = false,
    image = false,
    pdf = false,
    viewData = null,
    editData = null,
    required=true,
    multiInput = false
}) => {
    const {content} = useSelector((state) => state.content);
    const [selectedFile, setSelectedFile] = useState([]);
    const [allPreviewSource, setAllPreviewSource] = useState([]);    

    console.log("PDF...", pdf)
    useEffect(() => {
        register(name, {required: required})
    }, [register]);

    useEffect(() => {
        setValue(name, selectedFile);
    }, [selectedFile, setValue]);


  return (
    <div className='flex flex-col space-y-2 '>
        <label className='text-lg text-white font-poppins mb-5 w-full'
            htmlFor={name}
        >
            {label} {!viewData && (<sup className='text-red-500'>*</sup>)}
            <p className='text-sm leading-normal w- '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum atque eligendi, laudantium quam ducimus libero magnam ratione, quidem saepe nemo nesciunt veritatis, omnis deleniti</p>
        </label>         
        {
            (multiInput) ? ( 
                (
                    <div className='flex w-full mx-auto gap-4'>
                        <Swiper
                            className='mySwpier flex justify-between'
                            style={{
                                '--swiper-navigation-color': "#fff",
                                '--swiper-pagination-color': "#fff",
                            }}
                            spaceBetween={10}
                            slidesPerView={3}
  
                            navigation={true}
                            grabCursor={true}
                            modules={[Navigation]}
                        >
                            
                            {   
                                allPreviewSource?.map((previewSource, index) => (
                                    <SwiperSlide
                                        className=''
                                    >
                                        <DropzoneSpace 
                                            viewData={viewData}
                                            editData={editData}
                                            video={video}
                                            image={image}
                                            previewSource={previewSource}
                                            setSelectedFile={setSelectedFile}
                                            setAllPreviewSource={setAllPreviewSource}
                                            selectedFile={selectedFile}
                                            setValue={setValue}
                                            name={name}
                                            index={index}
                                        />
                                    </SwiperSlide>
                                ))
                            }
                            <SwiperSlide >
                                <DropzoneSpace 
                                    viewData={viewData}
                                    editData={editData}
                                    video={video}
                                    image={image}
                                    setSelectedFile={setSelectedFile}
                                    setAllPreviewSource={setAllPreviewSource}
                                    selectedFile={selectedFile}
                                    setValue={setValue}
                                    name={name}
                                    customClasses="cursor-pointer"
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <DropzoneSpace 
                                    viewData={viewData}
                                    editData={editData}
                                    video={video}
                                    image={image}
                                    setSelectedFile={setSelectedFile}
                                    setAllPreviewSource={setAllPreviewSource}
                                    selectedFile={selectedFile}
                                    setValue={setValue}
                                    name={name}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <DropzoneSpace 
                                    viewData={viewData}
                                    editData={editData}
                                    video={video}
                                    image={image}
                                    setSelectedFile={setSelectedFile}
                                    setAllPreviewSource={setAllPreviewSource}
                                    selectedFile={selectedFile}
                                    setValue={setValue}
                                    name={name}
                                />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                )                    
            )
            :
            (   
                <DropzoneSpace 
                    viewData={viewData}
                    editData={editData}
                    previewSource={allPreviewSource[0]}
                    setSelectedFile={setSelectedFile}
                    setAllPreviewSource={setAllPreviewSource}
                    selectedFile={selectedFile}
                    setValue={setValue}
                    name={name}
                    customClasses="w-full h-full object-cover "
                    index={0}    
                    customIcon={customIcon}
                    pdf={pdf}
                    video={video}
                    multiInput={multiInput}
                />
            )
        }
        {/* <DropzoneSpace 
            viewData={viewData}
            editData={editData}
            video={video}
            image={image}
            setSelectedFile={setSelectedFile}
            setAllPreviewSource={setAllPreviewSource}
            selectedFile={selectedFile}
            setValue={setValue}
            name={name}
        /> */}

        {/* <div
            className={`${isDragActive ? "bg-transparent" : "bg-transparent"}
                flex min-h-[250px] cursor-pointer items-center justify-center rounded-md
                border-2 border-dotted 
            `}
        >
            {
                previewSource ? (
                <div className='flex w-full flex-col p-6'>
                    {!video ? (
                        <img 
                            src={previewSource} 
                            alt="Preview"
                            className='h-full w-full rounded-md object-cover'  
                        />
                    )
                    : (
                        <Player 
                            aspectRatio='16:9'
                            playsInline 
                            src={previewSource}
                        />
                    )}

                    {!viewData && (
                        <button
                            type='button'
                            onClick={() => {
                                setPreviewSource("");
                                setSelectedFile(null);
                                setValue(name, null);
                            }}
                            className='text-gray-500 underline mt-3'
                        >
                            Cancle
                        </button>
                    )}
                </div>
            )
            : 
                (
                    <div
                        className='flex w-full flex-col items-center p-6'
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} ref={inputRef} />
                        <div>
                            {image ? <IoImageOutline /> : video ? <FcFilmReel /> : <FiUploadCloud size={30}/>}
                        </div>
                        <p className='text-center'>
                            Drag and drop an {!video ? "image" : "video"}, or <br />click to {" "}
                            <span className='font-semibold text-yellowNeon'>Browse</span> a
                            file
                        </p>
                    </div>
                )
            }
        </div> */}

        {errors[name] && (
            <span className='text-red-600 text-sm'>
                {label} is required <sup>*</sup>
            </span>
        )}
    </div>
  )
}

export default Upload