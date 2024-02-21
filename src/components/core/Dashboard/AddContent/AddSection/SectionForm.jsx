import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FORM_DETAILS } from '../../../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import Upload from '../UploadComponent/Upload';
import { FaFilePdf } from 'react-icons/fa6';
import Button from '../../../../common/Button';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import { setAddSection, setEditSection } from '../../../../../slices/sectionSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/contentAPI';
import { setContent } from '../../../../../slices/contentSlice';
import storeToFirebase from '../../../../../utils/storeToFirebase';

const SectionForm = ({title}) => {
    const {
      register,
      setValue,
      getValues,
      handleSubmit,
      formState: {errors}
    } = useForm();
    const {editSection, addSection, loading} = useSelector((state) => state.section)
    const {content} = useSelector((state) => state.content);
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const isFormUpdated = () => {
      const currentValues = getValues();
      const sectionImage = [editSection?.sectionImage];
      if(
        currentValues?.sectionName !== editSection?.sectionName
        || currentValues?.sectionDescription !== editSection?.sectionDescription
        || currentValues?.file.toString() !== sectionImage.toString()
      ) {
        return true;
      }
      return false;
    }

    const handleOnSubmit = async(data) => {
      if(editSection) {
        const toastId = toast.loading("Loading...");
        if(isFormUpdated()) {
          let sectionImage;
          console.log("DATA...", data);
          if(data?.file){
            sectionImage = await storeToFirebase(data?.file, user._id);
          }
          console.log("Section Image...", sectionImage);
          const formData = new FormData();
          formData.append("sectionName", data?.sectionName);
          formData.append("sectionDescription", data?.sectionDescription);
          formData.append("sectionImage", sectionImage[0]);
          formData.append("contentId", content?._id);
          formData.append("sectionId", editSection?._id);
          try{
            const result = await updateSection(formData, token);
            if(result) {
              dispatch(setEditSection(null));
              dispatch(setContent(result));
            }
          } catch(error) {
            console.log("ERROR while Editing Section in Section Form....", error);
          }
        } else {
          toast.error("No Changes made");
        }
        toast.dismiss(toastId);  
        return;
      }    
  
      const toastId = toast.loading("Loading...");
      const sectionImage = await storeToFirebase(data?.file, user._id);
      const formData = new FormData();
      formData.append("sectionName", data?.sectionName);
      formData.append("sectionDescription", data?.sectionDescription);
      formData.append("sectionImage", sectionImage);
      formData.append("contentId", content?._id);
  
      try {
        const result = await createSection(formData, token)
        if(result) {
          dispatch(setAddSection(null));
          dispatch(setContent(result));
        }
  
      } catch(error) {
        console.log("Error...", error)
      }
      toast.dismiss(toastId);
    }

    const handleCancel = async() => {
      dispatch(setEditSection(null));
      dispatch(setAddSection(null));
    }

    useEffect(() => {
      if(editSection) {      
        setValue("sectionName", editSection?.sectionName);
        setValue("sectionDescription", editSection?.sectionDescription);
        setValue("file", editSection?.sectionImage);
      }
    }, [])
  return (
    <div className='border border-dotted border-white rounded-lg p-6 h-full w-full'>
      <form className='text-white flex flex-col justify-center gap-y-6 '
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <h2 className='text-2xl text-white'>
          {title}
        </h2>
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
            {FORM_DETAILS?.SECTION?.SECTION_DESCRIPTION_HEADING}
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
                {...register("sectionDescription", {required: false})}
            />
            <label htmlFor="sectionDescription"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6  
                peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                rtl:peer-focus:left-auto start-1 cursor-text"
            >
                {FORM_DETAILS?.SECTION?.SECTION_DESCRIPTION_HEADING}
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
            editData={editSection?.sectionImage ? [editSection?.sectionImage] : null}
            customIcon={<FaFilePdf size={25}/>}
            pdf={true}
            required={false}
          />)
        :(<Upload 
            errors={errors}
            label="Enter Videos"
            name="file"
            register={register}
            setValue={setValue}
            video={true}
            required={false}
            editData={editSection?.sectionImage ? [editSection?.sectionImage] : null}
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