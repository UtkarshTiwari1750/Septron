import React, { useEffect } from 'react'
import { FORM_DETAILS } from '../../../../../utils/constants' 
import { useForm } from 'react-hook-form'
import Upload from '../UploadComponent/Upload';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../common/Button';
import { FaFilePdf } from "react-icons/fa6";
import storeToFirebase from '../../../../../utils/storeToFirebase';
import toast from 'react-hot-toast';
import { createSubSection, updateSubSection } from '../../../../../services/operations/contentAPI';
import { setContent, setLoading } from '../../../../../slices/contentSlice';
import { setAddSubSection, setEditSubSection } from '../../../../../slices/subSectionSlice';
import { MdOutlineAddToPhotos } from "react-icons/md";


const SubSectionForm = ({title}) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: {errors}
  } = useForm();
  const {addSubSection, editSubSection} = useSelector((state) => state.subSection);
  const {content, loading} = useSelector((state) => state.content);
  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(setAddSubSection(null));
    dispatch(setEditSubSection(false));
  }

  const isFormUpdated = () => {
    const currentValues = getValues();
    if(
      currentValues?.subSectionName !== editSubSection?.title
      || currentValues?.subSectionDescription !== editSubSection?.description
      || currentValues?.file.toString() !== editSubSection?.url.toString()
    ) {
      return true;
    }
    return false;
  }

  const handleOnSubmit = async(data) => {
    if(editSubSection) {
      if(isFormUpdated()) {
        let url = [];
        
        const oldFileUrl = data?.file.filter((fi) => typeof(fi) === 'string');
        const newFile = data?.file.filter((fi) => typeof(fi) === 'object');

        const toastId = toast.loading("Loading...");
        if(newFile.length > 0) {
          url = await storeToFirebase(newFile, user._id);
        }

        url = oldFileUrl.concat(url);

        const formData = new FormData();
        formData.append("title", data?.subSectionName);
        formData.append("description", data?.subSectionDescription);
        formData.append("url", url);
        formData.append("sectionId", editSubSection?.sectionId);
        formData.append("subSectionId", editSubSection?._id);
        setLoading(true);
        try{
          const result = await updateSubSection(formData, token);
          if(result) {
            const updatedContentSection = content?.contentSections?.map((section) => 
            section._id === editSubSection.sectionId ? result : section
            );
            const updatedContent = {...content, contentSections: updatedContentSection};
            dispatch(setEditSubSection(null));
            dispatch(setContent(updatedContent));
          }
        } catch(error) {
          console.log("ERROR while Editing Subsection in SubSection Form....", error);
        }
        toast.dismiss(toastId);  
      } else {
        toast.error("No Changes made");
      }
      return;
    }    

    const toastId = toast.loading("Loading...");
    setLoading(true);
    const url = await storeToFirebase(data?.file, user._id);
    console.log("DATA...", data);
    const formData = new FormData();
    formData.append("title", data?.subSectionName);
    formData.append("description", data?.subSectionDescription);
    formData.append("url", url);
    formData.append("sectionId", addSubSection);

    try {
      const result = await createSubSection(formData, token)
      if(result) {
        const updatedContentSection = content?.contentSections?.map((section) => 
        section._id === addSubSection ? result : section
        );
        const updatedContent = {...content, contentSections: updatedContentSection};
        dispatch(setAddSubSection(null));
        dispatch(setContent(updatedContent));
      }

    } catch(error) {
      console.log("Error...", error)
    }
    toast.dismiss(toastId);
    setLoading(false);
  }

  useEffect(() => {
    if(editSubSection) {      
      setValue("subSectionName", editSubSection?.title);
      setValue("subSectionDescription", editSubSection?.description);
      setValue("file", editSubSection?.url);
    }
  }, [])

  return (
    <div className='border border-dotted border-white rounded-lg p-6 h-full w-full'>
      <form className='text-white flex flex-col justify-center gap-y-6 '
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <h2 className='text-2xl'>
          {title}
        </h2>
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
            editData={editSubSection ? editSubSection?.url : null}
            customIcon={<FaFilePdf size={25}/>}
            pdf={true}
          />)
        :(<Upload 
            errors={errors}
            label="Enter Videos"
            name="file"
            register={register}
            setValue={setValue}
            editData={editSubSection ? editSubSection?.url : null}
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
            text={editSubSection ? "Update" : "Create"}
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

export default SubSectionForm