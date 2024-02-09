import React from 'react'
import { useForm } from 'react-hook-form'

const ContentInfo = () => {
  const {
    register,
    formState: {errors},
    setValue,
    getValues,
    handleSubmit,
  } = useForm();

  return (
    <div className='text-white p-5'>
      <div>
        <div className='flex justify-between items-center '>
          <div className='w-[25%] text-lg font-poppins'>
            Content Title <sup>*</sup>
          </div>
          <div className='relative w-full'>
            <input 
                type="text" 
                id='contentName'
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                border border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                placeholder=" " 
                {...register("contentName", {required: true})}
            />
            <label htmlFor="contentName"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                rtl:peer-focus:left-auto start-1"
            >
                Content Title <sup>*</sup>
            </label>
            {errors.contentName && (
                <span className='text-red-500 text-xs absolute'>
                  Content Title is required
                </span>
            )}
          </div>
        </div>

        <div className='flex justify-between items-center '>
          <div className='w-[25%] text-lg font-poppins'>
            Content Type <sup>*</sup>
          </div>

          <select 
            id="contentType"
            {...register("contentType", {required: true})}
            defaultValue=""
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent dark:bg-[#000814] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
            <option value="" disabled>
              Choose Content Type
            </option>
            <option
              value="Video"
            >
              Anime
            </option>
            <option
              value="Book"
            >
              Comic
            </option>
          </select>
        </div>

        

      </div>
    </div>
  )
}

export default ContentInfo