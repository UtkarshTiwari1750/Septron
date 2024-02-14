import React, { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { Player } from 'video-react';
import { FiUploadCloud } from "react-icons/fi"
import { IoImageOutline } from "react-icons/io5";
import { FcFilmReel } from "react-icons/fc";

const DropzoneSpace = ({
    index,
    video,
    image,
    viewData,
    editData,
    setSelectedFile,
    setAllPreviewSource,
    selectedFile,
    setValue,
    previewSource,
    name,
    customClasses
}) => {
    const inputRef = useRef(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if(file) {
            previewFile(file);
            setSelectedFile((prev) => [...prev, file]);
        }
    }

    const { getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: !video
        ? { "image/*": [".jpeg", ".jpg", ".png", ".pdf"] }
        : { "video/*": [".mp4", ".mkv"]},
        onDrop,
    })

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setAllPreviewSource( (prev) => [...prev, reader.result]);
        }
    }
  return (
    <div>
        <div
            className={`${isDragActive ? "bg-transparent" : "bg-transparent"}
                flex mx-auto w-[240px] min-h-[250px] ${(image || video) ? "cursor-grab": "cursor-pointer"} items-center justify-center rounded-md
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
                            className={`rounded-md ${customClasses ? customClasses : "object-scale-down w-[195.5px] h-[150px]"}`}  
                        />
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
                            {image ? <IoImageOutline size={30} /> : video ? <FcFilmReel size={30}/> : <FiUploadCloud size={30}/>}
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