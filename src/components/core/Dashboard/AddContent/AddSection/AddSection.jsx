import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineFolderAdd } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
// import { setSectionNames } from '../../../../slices/sectionSlice';
import { createSection } from '../../../../../services/operations/contentAPI';
import { setContent } from '../../../../../slices/contentSlice';
import NestedView from './NestedView';
import SubSectionForm from './SubSectionForm';

const AddSection = () => {
  const {content} = useSelector((state) => state.content);
  // const {sectionNames} = useSelector((state) => state.section);
  const {token} = useSelector((state) => state.auth);
  const [subSectionFormData, setSubSectionFormData] = useState(false);
  const {addSubSection} = useSelector((state) => state.subSection)
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm();

  const dispatch = useDispatch();

  const handleAddSection = async(data) => {
    const sectionValue = data?.sectionName?.trim();
    // Handling Empty Input Value
    if(!sectionValue || sectionValue === "") {
      toast.error("Enter Section Name to Add")
      return;
    } else {
      // const newSection = [...sectionNames, sectionValue];
      try{
        const data = {
          sectionName: sectionValue,
          contentId: content._id,
        }
        const result = await createSection(data, token);
        if(result) {
          dispatch(setContent(result));
        }
      } catch(error) {
        console.log("ERROR in HANDLE ADD SECTION...", error);
      }
      // dispatch(setSectionNames(newSection));
      setValue("sectionName", "");
    }
  }

  const handleAddIcon = () => {

  }

  const handleChangeEditSectionName = () => {
    
  }
  return (
    <div className='text-white w-full h-full pt-5'>
      <div className='w-11/12 max-w-[1080px] flex justify-between mx-auto px-8'>

        {/* Section Structure */}
        <form
          onSubmit={handleSubmit(handleAddSection)} 
          className='w-[40%] border border-white rounded-lg px-4 py-4 h-full min-h-[100px]'>
          
          {/* Headin and Section Name Input */}
          <div className=''>
            {/* Heading */}
            <div className='flex justify-between gap-x-4 items-end'>
              <p className='text-lg'>
                {content?.contentName}
              </p>
              
              {/* Add Icon */}
              <AiOutlineFolderAdd 
                size={25} 
                className='cursor-pointer mr-6 hover:scale-90'
                onClick={handleAddIcon}
              />
            </div>

            {/* Section Name Input and Add Button */}
            <div className='flex items-center w-full mt-3 -ml-1 justify-between'>
              {/* Section Name Input */}      
              <div className='relative w-[70%]'>
                <input 
                  type="text" 
                  id="sectionName"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                  border border-gray-300 appearance-none dark:text-white dark:border-gray-600
                  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none" 
                  placeholder=" " 
                  {...register("sectionName", {required: false})}
                />
                <label htmlFor="subSectionName"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                  -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                  dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 
                  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                  rtl:peer-focus:left-auto start-1 cursor-text"
                >
                  Section Name<sup>*</sup>
                </label>
                {errors.sectionName && (
                  <span className='text-red-700 '>
                    Section Name is required
                  </span>
                )}
              </div>

              {/* Add Button */}
              <button className='rounded-lg px-4 py-[0.6rem] border border-white hover:scale-95 transition-all duration-300'
                type='submit'
              >
                Add
              </button>
            </div>
          </div>

          <div>
            {content?.contentSections && (
              <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
            )}
          </div>

        </form>

        {/* Add Section Form */}
        <div className='w-[55%]'>
          {addSubSection ? (<SubSectionForm subSectionFormData={subSectionFormData} />): (<div></div>)}
        </div>

      </div>
    </div>
  )
}

export default AddSection