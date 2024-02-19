import React, { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { Player } from 'video-react';
import { FiUploadCloud } from "react-icons/fi"
import { IoImageOutline } from "react-icons/io5";
import { FcFilmReel } from "react-icons/fc";
import { Document, Page } from 'react-pdf';
import { setLoading } from '../../../../../slices/contentSlice';

const DropzoneSpace = ({
    index,
    video,
    image,
    pdf,
    viewData,
    setSelectedFile,
    setAllPreviewSource,
    selectedFile,
    setValue,
    previewSource,
    name,
    customClasses,
    editData = null,
    customIcon,
    multiInput,
}) => {
    const inputRef = useRef(null);
    const onDrop = (acceptedFiles) => {
        setLoading(true);
        const file = acceptedFiles[0];
        if(file) {
            previewFile(file);
            setSelectedFile((prev) => [...prev, file]);
        }
    }

    const { getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: video
        ? { "video/*": [".mp4", ".mkv"]}
        : pdf ? { "image/*": [".pdf"]}
        : { "image/*": [".jpeg", ".jpg", ".png"] },
        onDrop,
    })

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setAllPreviewSource( (prev) => [...prev, reader.result]);
            setLoading(false);
        }
    }

  return (
    <div>
        <div
            className={`${isDragActive ? "bg-transparent" : "bg-transparent"}
                flex mx-auto min-h-[250px] ${(multiInput) ? "cursor-grab  w-[240px] ": "cursor-pointer"} items-center justify-center rounded-md
                border-2 border-dotted text-white
            `}
        >
            {
                previewSource ? (
                <div className='flex w-full flex-col p-6'>
                    {!video ? (
                        <div>
                            {!pdf 
                            ? (<img 
                                src={previewSource} 
                                alt="Preview"
                                className={`rounded-md ${customClasses ? customClasses : "object-scale-down w-[195.5px] h-[150px]"}`}  
                            />)
                            :<iframe src={previewSource} frameborder="0"></iframe>
                            }

                        </div>
                    )
                    : (
                        <video src={previewSource} autoPlay muted controls />
                    )}

                    {!viewData && (
                        <button
                            type='button'
                            onClick={() => {
                                setAllPreviewSource((prev) => (prev.filter((_,rmIndex) => index != rmIndex)))
                                setSelectedFile((prev) => (prev.filter((_,rmIndex) => index != rmIndex)));
                                setValue(name, selectedFile);

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
                            {image ? <IoImageOutline size={30} /> : video ? <FcFilmReel size={30}/> : customIcon ? customIcon : <FiUploadCloud size={30}/>}
                        </div>
                        <p className='text-center'>
                            Drag and drop an {!video ? "image" : "video"}, or <br />click to {" "}
                            <span className='font-semibold text-yellowNeon'>Browse</span> a
                            file
                        </p>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default DropzoneSpace