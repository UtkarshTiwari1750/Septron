import React from 'react'
import Upload from './UploadComponent/Upload'
import { useForm } from 'react-hook-form'

const Gallery = () => {
  const {
    register,
    formState: {errors},
    setValue,
    getValues,
    handleSubmit
  } = useForm()

  return (
    <div className='text-white'>
      <form>
        <Upload 
          errors={errors}
          label="Enter Images"
          name="image"
          register={register}
          setValue={setValue}
          image={true}
        />



      </form>
    </div>
  )
}

export default Gallery