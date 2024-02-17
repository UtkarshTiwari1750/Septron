import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineFolderAdd } from "react-icons/ai";
import Input from '../../../../common/Input';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
// import { setSectionNames } from '../../../../slices/sectionSlice';
import { createSection } from '../../../../../services/operations/contentAPI';
import { setContent } from '../../../../../slices/contentSlice';
import NestedView from './NestedView';

const AddSection = () => {
  const {content} = useSelector((state) => state.content);
  // const {sectionNames} = useSelector((state) => state.section);
  const {token} = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm();

  const dispatch = useDispatch();

  const handleAddSection = async(data) => {
    console.log("Section data...", data);

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
          className='w-[30%] border border-white rounded-lg px-4 py-4 h-full min-h-[100px]'>
          
          {/* Headin and Section Name Input */}
          <div className=''>
            {/* Heading */}
            <div className='flex justify-between gap-x-4 items-center'>
              <p className='text-lg'>
                {content?.contentName}
              </p>
              
              {/* Add Icon */}
              <AiOutlineFolderAdd 
                size={25} 
                className='cursor-pointer mr-6'
                onClick={handleAddIcon}
              />
            </div>

            {/* Section Name Input and Add Button */}
            <div className='flex items-center w-full mt-3 -ml-1 justify-between'>
              {/* Section Name Input */}
              {/* <Input
                register={register}
                errors={errors}
                name="sectionName"
                label="Section Name"
                required={false}
              /> */}
              
              <input 
                type="text" 
                id="sectionName"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                border border-gray-300 appearance-none dark:text-white dark:border-gray-600
                dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none" 
                placeholder=" " 
                {...register("sectionName", {required: true})}
              />
              {errors.sectionName && (
                <span className='text-red-700 '>
                  Section Name is required
                </span>
              )}

              {/* Add Button */}
              <button className='rounded-lg px-4 py-2 border border-white'
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
        <div className='w-[50%]'>
          <p>Add Section Form</p>
        </div>

      </div>
    </div>
  )
}

export default AddSection