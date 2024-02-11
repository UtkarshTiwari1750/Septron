import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getAllGenre } from '../../../../services/operations/contentAPI';
import toast from 'react-hot-toast';
import Button from "../../../common/Button"
import { setStep } from '../../../../slices/contentSlice';
import { useDispatch } from 'react-redux';
const ContentInfo = () => {
  const {
    register,
    formState: {errors},
    setValue,
    getValues,
    handleSubmit,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [allGenre, setAllGenre] = useState([]);
  const dispatch = useDispatch();
  const handleOnSubmit = async(data) => {
    console.log("DATA.....", data);
    dispatch(setStep(2));
  }

  useEffect(() => {
    setLoading(true);
    if(!sessionStorage.getItem("genreNames")){
      ;(async() => {
        const result = await getAllGenre();
        if(!result){
          toast.error("Cannot fetch Genre");
        }
        setAllGenre(result);
      })()
    } 
    else{
      setAllGenre(sessionStorage.getItem("genreNames"));
    }
    setLoading(false);

  }, []) 

  return (
    <form 
    onSubmit={handleSubmit(handleOnSubmit)}
    className='text-white p-5'>
      <div className='w-11/12 max-w-[1080px] mx-auto px-16 py-6 bg-transparent rounded-lg shadow-[0_0_15px_1px] 
        backdrop-blur-lg '
      >
        <div className='flex flex-col justify-center gap-y-6 '>
          <div className='flex justify-between items-center '>
            <div className='w-[30%] text-lg font-poppins'>
              Content Title
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
            <div className='w-[30%] text-lg font-poppins'>
              Content Description
            </div>
            <div className='relative w-full'>
              <textarea 
                  type="text" 
                  id='contentDescription'
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                  border border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                  placeholder=" " 
                  {...register("contentDescription", {required: true})}
              />
              <label htmlFor="contentDescription"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                  -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                  dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                  rtl:peer-focus:left-auto start-1"
              >
                  Content Description <sup>*</sup>
              </label>
              {errors.contentName && (
                  <span className='text-red-500 text-xs absolute'>
                    Content Description is required
                  </span>
              )}
            </div>
          </div>

          <div className='flex justify-between items-center '>
            <div className='w-[30%] text-lg font-poppins'>
              Content Type <sup>*</sup>
            </div>
              
            <div className='w-full'>
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
              {errors.contentType && (
                    <span className='text-red-500 text-xs absolute'>
                      Content Type is required
                    </span>
              )}
            </div>
          </div>

          <div className='flex justify-between items-center'>
            <div className='w-[30%] text-lg font-poppins'>
              Genre <sup>*</sup>
            </div>
            
            <div className='w-full'>
              <select 
                id="genre"
                {...register("genre", {required: true})}
                defaultValue=""
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent dark:bg-[#000814] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              >
                <option value="" disabled>
                  Choose Genre
                </option>
                {/* {
                  !loading && allGenre && allGenre?.map((genre, i) => (
                    <option key={i} value={genre?._id}>
                      {genre?.name}
                    </option>
                  ))
                } */}

                <option value="Horror">
                  Horror
                </option>
              </select>
              {errors.contentType && (
                    <span className='text-red-500 text-xs absolute'>
                      Genre is required
                    </span>
              )}
            </div>
          </div>

          <div className='flex justify-between items-center '>
            <div className='w-[30%] text-lg font-poppins'>
              Tag <sup>*</sup>
            </div>
            <div className='relative w-full'>
              <input 
                  type="text" 
                  id='tag'
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                  border border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                  placeholder=" " 
                  {...register("tag", {required: true})}
              />
              <label htmlFor="tag"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                  -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                  dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                  rtl:peer-focus:left-auto start-1"
              >
                  Tag 
              </label>
              {errors.contentName && (
                  <span className='text-red-500 text-xs absolute'>
                    Tags is required
                  </span>
              )}
            </div>
          </div>

          <div className='flex justify-between items-center '>
            <div className='w-[30%] text-lg font-poppins'>
              Instructions
            </div>
            <div className='relative w-full'>
              <input 
                  type="text" 
                  id='instructions'
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                  border border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                  placeholder=" " 
                  {...register("instructions", {required: true})}
              />
              <label htmlFor="instructions"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                  -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                  dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                  rtl:peer-focus:left-auto start-1"
              >
                  Instructions  <sup>*</sup>
              </label>
              {errors.contentName && (
                  <span className='text-red-500 text-xs absolute'>
                    Instructions is required
                  </span>
              )}
            </div>
          </div>

          <div className='flex justify-end'>
            <Button 
              text="Save & Next"
              type="submit"
            />
          </div>
        </div>  
        
      </div>
    </form>
  )
}

export default ContentInfo