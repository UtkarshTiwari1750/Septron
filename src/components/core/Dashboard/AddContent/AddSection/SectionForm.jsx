import React from 'react'
import { useForm } from 'react-hook-form'
import { FORM_DETAILS } from '../../../../../utils/constants';
import { useSelector } from 'react-redux';
import Upload from '../UploadComponent/Upload';
import { FaFilePdf } from 'react-icons/fa6';
import Button from '../../../../common/Button';
import { MdOutlineAddToPhotos } from 'react-icons/md';

const SectionForm = () => {
    const {
      register,
      setValue,
      getValues,
      handleSubmit,
      formState: {errors}
    } = useForm();
    const {editSection, addSection, loading} = useSelector((state) => state.section)
    const {content} = useSelector((state) => state.content);
    const handleOnSubmit = async(data) => {
      
    }

    const handleCancel = async() => {

    }

  return (
    <div className='border border-dotted border-white rounded-lg p-6 h-full w-full'>
      <form className='text-white flex flex-col justify-center gap-y-6 '
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        {/* Title */}
        <div className='flex justify-between items-start w-full gap-x-6'>
          <div className='w-[70%] text-lg font-poppins'>
            <p>
              {FORM_DETAILS?.SECTION?.SECTION_TITLE_HEADING} <sup className='text-red-500'>*</sup>
            </p>
            <p className='text-xs leading-normal w-[88%] text-'>
              {FORM_DETAILS?.SECTION?.SECTION_TITLE_SUBHEADING}
            </p>
          </div>
          <div className='relative w-[90%]'>
            <input 
                type="text" 
                id='sectionName'
                className="block px-2.5 pb-2.5 pt-4 min-h-[42px] w-full text-sm text-gray-900 bg-transparent rounded-lg 
                border border-gray-300 appearance-none dark:text-white dark:border-gray-600
                dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none" 
                placeholder=" " 
                {...register("sectionName", {required: true})}
            />
            <label htmlFor="sectionName"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 
                peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                rtl:peer-focus:left-auto start-1 cursor-text"
            >
              {FORM_DETAILS?.SECTION?.SECTION_TITLE_HEADING} <sup>*</sup>
            </label>
            {errors.sectionName && (
                <span className='text-red-500 text-xs absolute'>
                  {FORM_DETAILS?.SECTION?.SECTION_TITLE_HEADING} is required
                </span>
            )}
          </div>
        </div>
        
        {/* Description */}
        <div className='flex justify-between items-start w-full gap-x-6'>
          <div className='w-[70%] text-lg font-poppins'>
            {FORM_DETAILS?.SECTION?.SECTION_DESCRIPTION_HEADING} <sup className='text-red-500'>*</sup>
            <p className='text-xs leading-normal w-[88%]'>{FORM_DETAILS?.SECTION?.SECTION_DESCRIPTION_SUBHEADING}</p>
          </div>
          <div className='relative  w-[90%]'>
            <textarea 
                type="text" 
                rows={4}
                id='sectionDescription'
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                border border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                placeholder=" " 
                {...register("sectionDescription", {required: true})}
            />
            <label htmlFor="sectionDescription"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6  
                peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                rtl:peer-focus:left-auto start-1 cursor-text"
            >
                {FORM_DETAILS?.SECTION?.SECTION_DESCRIPTION_HEADING} <sup>*</sup>
            </label>
            {errors.sectionDescription && (
                <span className='text-red-500 text-xs absolute'>
                  {FORM_DETAILS?.SECTION?.SECTION_DESCRIPTION_HEADING} is required
                </span>
            )}
          </div>
        </div>
        
        {/* Thumbnail */}
        {content?.contentType === "Book"
        ? (<Upload 
            register={register}
            label={FORM_DETAILS?.SECTION?.SECTION_IMAGE_HEADING}
            name="file"
            setValue={setValue}
            errors={errors}
            editData={editSection ? content?.contentSection?.sectionImage : null}
            customIcon={<FaFilePdf size={25}/>}
            pdf={true}
          />)
        :(<Upload 
            errors={errors}
            label="Enter Videos"
            name="file"
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
            onClick={handleCancel}
          >
            Cancel
          </button>
          
          {/* Next Button */}
          <Button
            text="Create"
            type="submit"
            customClasses="gap-x-2 item-center px-2 pr-2"
            disabled={loading}
          >
            <MdOutlineAddToPhotos size={25}/>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SectionForm