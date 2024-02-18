import React from 'react'
import { FORM_DETAILS } from '../../../../../utils/constants' 
import { useForm } from 'react-hook-form'
import Upload from '../UploadComponent/Upload';
import { useSelector } from 'react-redux';
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
  return (
    <div className='text-white flex flex-col justify-center gap-y-2 '>
      {/* Title */}
      <div className='flex justify-between items-center w-full gap-x-6'>
        <div className='w-[50%] text-base font-poppins'>
          <p>
            {FORM_DETAILS?.SUBSECTION?.SUBSECTION_TITLE_HEADING}
          </p>
          <p className='text-[10px] leading-normal w-[88%] text-'>
            {FORM_DETAILS?.SUBSECTION?.SUBSECTION_TITLE_SUBHEADING}
          </p>
        </div>
        <div className='relative w-[70%]'>
          <input 
              type="text" 
              id='subSectionName'
              className="block px-2.5 pb-2.5 pt-4 min-h-[62px] w-full text-sm text-gray-900 bg-transparent rounded-lg 
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
      <div className='flex justify-between items-center w-full gap-x-6'>
        <div className='w-[50%] text-base font-poppins'>
          {FORM_DETAILS?.SUBSECTION?.SUBSECTION_DESCRIPTION_HEADING}
          <p className='text-[10px] leading-normal w-[88%]'>{FORM_DETAILS?.SUBSECTION?.SUBSECTION_DESCRIPTION_SUBHEADING}</p>
        </div>
        <div className='relative  w-[70%]'>
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
      <Upload 
        register={register}
        label={FORM_DETAILS?.SUBSECTION?.SUBSECTION_IMAGE_HEADING}
        name="file"
        setValue={setValue}
        errors={errors}
        editData={editSubSection ? content?.contentSection?.subSection?.url : null}
      />
    </div>
  )
}

export default SubSectionForm