import React, { useState } from 'react'
import { FORM_DETAILS } from '../../../../../utils/constants' 
import { useForm } from 'react-hook-form'
import Upload from '../UploadComponent/Upload';
import { useDispatch, useSelector } from 'react-redux';
import { IoChevronBackSharp } from 'react-icons/io5';
import { MdNavigateNext } from 'react-icons/md';
import Button from '../../../../common/Button';
import { FaFilePdf } from "react-icons/fa6";
import storeToFirebase from '../../../../../utils/storeToFirebase';
import toast from 'react-hot-toast';
import { createSubSection } from '../../../../../services/operations/contentAPI';
import { setContent, setStep } from '../../../../../slices/contentSlice';


const SubSectionForm = ({subSectionFormData}) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: {errors}
  } = useForm();
  const {editSubSection} = useSelector((state) => state.subSection);
  const {content} = useSelector((state) => state.content);
  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleGoBack = () => {

  }

  const handleAddSubSection = async(data) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    const url = await   (data?.file, user._id);

    const formData = new FormData();
    formData.append("title", data?.sectionName);
    formData.append("description", data?.subSectionDescription);
    formData.append("url", url)

    try {
      const result = await createSubSection(formData, token)
      if(result) {
        toast.success("Let's Go Baby!!");
        // dispatch(setStep(4));
        // dispatch(setContent(result));
      }

    } catch(error) {
      console.log("Error...", error)
    }
    toast.dismiss(toastId);
    setLoading(false);
  }
  return (
    <div className='border border-dotted border-white rounded-lg p-6 h-full w-full'>
      <form className='text-white flex flex-col justify-center gap-y-6 '
        onSubmit={handleSubmit(handleAddSubSection)}
      >
        {/* Title */}
        <div className='flex justify-between items-start w-full gap-x-6'>
          <div className='w-[70%] text-lg font-poppins'>
            <p>
              {FORM_DETAILS?.SUBSECTION?.SUBSECTION_TITLE_HEADING} <sup className='text-red-500'>*</sup>
            </p>
            <p className='text-xs leading-normal w-[88%] text-'>
              {FORM_DETAILS?.SUBSECTION?.SUBSECTION_TITLE_SUBHEADING}
            </p>
          </div>
          <div className='relative w-[90%]'>
            <input 
                type="text" 
                id='subSectionName'
                className="block px-2.5 pb-2.5 pt-4 min-h-[42px] w-full text-sm text-gray-900 bg-transparent rounded-lg 
                border border-gray-300 appearance-none dark:text-white dark:border-gray-600
                dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none" 
                placeholder=" " 
                {...register("subSectionName", {required: true})}
            />
            <label htmlFor="subSectionName"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 
                peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                rtl:peer-focus:left-auto start-1 cursor-text"
            >
              {FORM_DETAILS?.SUBSECTION?.SUBSECTION_TITLE_HEADING} <sup>*</sup>
            </label>
            {errors.subSectionName && (
                <span className='text-red-500 text-xs absolute'>
                  {FORM_DETAILS?.SUBSECTION?.SUBSECTION_TITLE_HEADING} is required
                </span>
            )}
          </div>
        </div>
        
        {/* Description */}
        <div className='flex justify-between items-start w-full gap-x-6'>
          <div className='w-[70%] text-lg font-poppins'>
            {FORM_DETAILS?.SUBSECTION?.SUBSECTION_DESCRIPTION_HEADING} <sup className='text-red-500'>*</sup>
            <p className='text-xs leading-normal w-[88%]'>{FORM_DETAILS?.SUBSECTION?.SUBSECTION_DESCRIPTION_SUBHEADING}</p>
          </div>
          <div className='relative  w-[90%]'>
            <textarea 
                type="text" 
                rows={4}
                id='subSectionDescription'
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                border border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                placeholder=" " 
                {...register("subSectionDescription", {required: true})}
            />
            <label htmlFor="subSectionDescription"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6  
                peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                rtl:peer-focus:left-auto start-1 cursor-text"
            >
                {FORM_DETAILS?.SUBSECTION?.SUBSECTION_DESCRIPTION_HEADING} <sup>*</sup>
            </label>
            {errors.subSectionDescription && (
                <span className='text-red-500 text-xs absolute'>
                  {FORM_DETAILS?.SUBSECTION?.SUBSECTION_DESCRIPTION_HEADING} is required
                </span>
            )}
          </div>
        </div>
        
        {/* Thumbnail */}
        {content?.contentType === "Book"
        ? (<Upload 
            register={register}
            label={FORM_DETAILS?.SUBSECTION?.SUBSECTION_IMAGE_HEADING}
            name="file"
            setValue={setValue}
            errors={errors}
            editData={editSubSection ? content?.contentSection?.subSection?.url : null}
            customIcon={<FaFilePdf size={25}/>}
            pdf={true}
          />)
        :(<Upload 
            errors={errors}
            label="Enter Videos"
            name="video"
            register={register}
            setValue={setValue}
            video={true}
            required={false}
          />)
        }
        

        {/* For Buttons */}
        <div className='flex items-center justify-end gap-x-6 text-white'>
          {/* Back Button */}
          <button className=' text-lg font-roboto box-border flex items-center gap-x-2 bg-gray-600 border border-white rounded-md px-2 py-2'
            onClick={handleGoBack}
          >
            <IoChevronBackSharp />
            Back
          </button>
          
          {/* Next Button */}
          <Button
            text="Next"
            type="submit"
            customClasses="gap-x-2 item-center px-2 pr-2"
          >
            <MdNavigateNext size={25}/>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SubSectionForm