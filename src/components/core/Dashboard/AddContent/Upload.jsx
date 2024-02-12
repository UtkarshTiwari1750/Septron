import React, { useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { Player } from 'video-react';
import { FiUploadCloud } from "react-icons/fi"

const Upload = ({
    name,
    label,
    register,
    setValue,
    errors,
    video = false,
    viewData = null,
    editData = null,
}) => {
    const {content} = useSelector((state) => state.content);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(
        viewData ? viewData : editData ? editData: ""
    );
    const inputRef = useRef(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if(file) {
            previewFile(file);
            setSelectedFile(file);
        }
    }

    const { getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: !video
        ? { "image/*": [".jpeg", ".jpg", ".png", ".pdf"] }
        : { "video/*": [".mp4"]},
        onDrop,
    })

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

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
        <div
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
                            <FiUploadCloud />
                        </div>
                        <p>
                            Drag and drop
                        </p>
                    </div>
                )
            }
        </div>

        {errors[name] && (
            <span>
                {label} is required
            </span>
        )}
    </div>
  )
}

export default Upload