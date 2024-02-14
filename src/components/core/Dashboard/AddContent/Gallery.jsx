import React from 'react'
import Upload from './UploadComponent/Upload'
import { useForm } from 'react-hook-form'
import Button from '../../../common/Button'
import { MdNavigateNext } from "react-icons/md";
import { IoChevronBackSharp } from "react-icons/io5";
import {setStep} from "../../../../slices/contentSlice"
import { useDispatch } from 'react-redux';

const Gallery = () => {
  const {
    register,
    formState: {errors},
    setValue,
    getValues,
    handleSubmit
  } = useForm()

  const dispatch = useDispatch();

  const handleOnSubmit = () => {

  }

  const handleGoBack = () => {
    dispatch(setStep(1));
  }
  return (
    <div className='text-white'>
      <form 
        onSubmit={handleSubmit(handleOnSubmit)}
        className='w-11/12 max-w-[1080px] mx-auto flex flex-col gap-y-6 p-5'
      >
        <Upload 
          errors={errors}
          label="Enter Images"
          name="image"
          register={register}
          setValue={setValue}
          image={true}
          required={false}
        />

        <div className='w-full mt-7'>
          <Upload 
            errors={errors}
            label="Enter Videos"
            name="video"
            register={register}
            setValue={setValue}
            video={true}
            required={false}
          />
        </div>

        <div className='flex items-center justify-end gap-x-6'>
          <button className=' text-lg font-roboto box-border flex items-center gap-x-2 bg-gray-600 border border-white rounded-md px-5 py-2'
            onClick={handleGoBack}
          >
            <IoChevronBackSharp />
            Back
          </button>
          
          <Button
            text="Next"
            type="submit"
            customClasses="gap-x-2 item-center"
          >
            <MdNavigateNext size={25}/>
          </Button>
        </div>


      </form>
    </div>
  )
}

export default Gallery