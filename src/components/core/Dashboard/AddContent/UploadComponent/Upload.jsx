import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import DropzoneSpace from './DropzoneSpace';

const Upload = ({
    name,
    label,
    register,
    setValue,
    errors,
    video = false,
    image = false,
    viewData = null,
    editData = null,
}) => {
    const {content} = useSelector((state) => state.content);
    const [selectedFile, setSelectedFile] = useState([]);
    const [allPreviewSource, setAllPreviewSource] = useState([]);    


    useEffect(() => {
        register(name, {required: true})
    }, [register]);

    useEffect(() => {
        setValue(name, selectedFile);
    }, [selectedFile, setValue]);


  return (
    <div className='flex flex-col space-y-2 '>
        <label className='text-lg text-white font-poppins w-[55%]'
            htmlFor={name}
        >
            {label} {!viewData && (<sup className='text-red-700'>*</sup>)}
            <p className='text-[10px] leading-normal w-full text-'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum atque eligendi, laudantium quam ducimus libero magnam ratione, quidem saepe nemo nesciunt veritatis, omnis deleniti</p>
        </label> 


        
        {
            (image || video) ? ( 
                (
                    <div className='flex w-[70%] mx-auto justify-between gap-4'>
                        {
                            allPreviewSource?.map((previewSource, index) => (
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
                                    customClasses=""
                                />
                            ))
                        }

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
            <span>
                {label} is required
            </span>
        )}
    </div>
  )
}

export default Upload