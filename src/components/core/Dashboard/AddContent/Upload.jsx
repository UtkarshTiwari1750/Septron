import React, { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';

const Upload = ({
    name,
    label,
    register,
    setValue,
    error,
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
        ? { "image/*": [".jpeg", ".jpg", ".png"] }
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


  return (
    <div className='text-white'>
        {/* <label>
            {label}
        </label> */}
        <div>
            <input type="file"/>
        </div>
    </div>
  )
}

export default Upload