import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createContent, getAllGenre } from '../../../../../services/operations/contentAPI';
import toast from 'react-hot-toast';
import Button from "../../../../common/Button"
import { setContent, setStep } from '../../../../../slices/contentSlice';
import { useDispatch, useSelector } from 'react-redux';
import Upload from '../UploadComponent/Upload';
import TagInput from './TagInput';
import storeToFirebase from '../../../../../utils/storeToFirebase';


const ContentInfo = () => {
  const {
    register,
    formState: {errors},
    setValue,
    getValues,
    handleSubmit,
  } = useForm();

  const {token} = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false);
  const [allGenre, setAllGenre] = useState([]);
  const dispatch = useDispatch();

  const handleOnSubmit = async(data) => {
    const thumbnailUrl = await storeToFirebase(data.thumbnail);
    setLoading(true);
    const formData = new FormData();
    formData.append("contentName", data.contentName);
    formData.append("contentDescription", data.contentDescription);
    formData.append("price", data.price);
    formData.append("thumbnail", thumbnailUrl);
    formData.append("tag", JSON.stringify(data.tag));
    formData.append("genre", data.genre);
    formData.append("instructions", JSON.stringify(data.instructions));
    formData.append("contentType", data.contentType);
    

    try{
      const result = await createContent(formData, token);
      if(result) {
        dispatch(setStep(2));
        dispatch(setContent(result));
      }
    } catch(error) {
      console.log("ERROR...", error)
    }
    setLoading(false);
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
      setAllGenre(JSON.parse(sessionStorage.getItem("genreNames")));
    }
    setLoading(false);

  }, []) 

  return (
    <form 
    onSubmit={handleSubmit(handleOnSubmit)}
    className='text-white p-5'>
      
      <div className='w-11/12 max-w-[880px] mx-auto px-16 py-6 bg-transparent rounded-lg shadow-[0_0_15px_1px] 
        backdrop-blur-lg '
      >
        
        <div className='flex flex-col justify-center gap-y-6 '>
          {/* Content Title */}
          <div className='flex justify-between items-center w-full gap-x-6'>
              <div className='w-[50%] text-base font-poppins'>
                Content Title
                <p className='text-[10px] leading-normal w-[88%] text-'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum atque eligendi, laudantium quam ducimus </p>
              </div>
              <div className='relative w-[70%]'>
                <textarea 
                    type="text" 
                    id='contentName'
                    className="block px-2.5 pb-2.5 pt-4 min-h-[82px] w-full text-sm text-gray-900 bg-transparent rounded-lg 
                    border border-gray-300 appearance-none dark:text-white dark:border-gray-600
                    dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none" 
                    placeholder=" " 
                    {...register("contentName", {required: true})}
                />
                <label htmlFor="contentName"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                    -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                    dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 
                    peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                    rtl:peer-focus:left-auto start-1 cursor-text"
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
          
          {/* Description */}
          <div className='flex justify-between items-center w-full gap-x-6'>
            <div className='w-[50%] text-base font-poppins'>
              Content Description
              <p className='text-[10px] leading-normal w-[88%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum atque eligendi, laudantium quam ducimus </p>
            </div>
            <div className='relative  w-[70%]'>
              <textarea 
                  type="text" 
                  rows={4}
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
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6  
                  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                  rtl:peer-focus:left-auto start-1 cursor-text"
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
          
          <Upload 
            register={register}
            label="Content Thumbnail"
            name="thumbnail"
            setValue={setValue}
            errors={errors}
          />
          

          {/* Content Type */}
          <div className='flex justify-between items-center w-full gap-x-6 '>
            <div className='w-[50%] text-base font-poppins'>
              Content Type <sup>*</sup>
              <p className='text-[10px] leading-normal w-[88%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum atque eligendi, laudantium quam ducimus </p>
            </div>
              
            <div className='w-[70%]'>
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
          
          {/* Genre */}
          <div className='flex justify-between items-center w-full gap-x-6'>
            <div className='w-[50%] text-base font-poppins'>
              Genre <sup>*</sup>
              <p className='text-[10px] leading-normal w-[88%] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum atque eligendi, laudantium quam ducimus </p>
            </div>
            
            <div className='w-[70%]'>
              <select 
                id="genre"
                {...register("genre", {required: true})}
                defaultValue=""
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent dark:bg-[#000814] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              >
                <option value="" disabled>
                  Choose Genre
                </option>
                {
                  !loading && allGenre?.map((genre, i) => (
                    <option key={i} value={genre?._id}>
                      {genre?.name}
                    </option>
                  ))
                }

              </select>
              {errors.contentType && (
                    <span className='text-red-500 text-xs absolute'>
                      Genre is required
                    </span>
              )}
            </div>
          </div>
          
          {/* Tag */}
          <TagInput 
            register={register}
            label="Tag"
            name="tag"
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            placeholder="Enter Tags Here"
          />

          {/* Instructions */}
          <div className='flex justify-between items-center w-full gap-x-6'>
            <div className='w-[50%] text-base font-poppins'>
              Instructions
              <p className='text-[10px] leading-normal w-[88%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum atque eligendi, laudantium quam ducimus </p>

            </div>
            <div className='relative w-[70%]'>
              <textarea 
                  type="text" 
                  id='instructions'
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                  border border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none" 
                  placeholder=" " 
                  {...register("instructions", {required: true})}
              />
              <label htmlFor="instructions"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                  -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                  dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 
                  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                  rtl:peer-focus:left-auto start-1 cursor-text"
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
          
          {/* Price */}
          <div className='flex justify-between items-center w-full gap-x-6'>
            <div className='w-[50%] text-base font-poppins'>
              Price
              <p className='text-[10px] leading-normal w-[88%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum atque eligendi, laudantium quam ducimus </p>

            </div>
            <div className='relative w-[70%]'>
              <input 
                  type="text" 
                  id='price'
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                  border border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none" 
                  placeholder=" " 
                  {...register("price", {required: true})}
              />
              <label htmlFor="price"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                  -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                  dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 
                  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                  rtl:peer-focus:left-auto start-1 cursor-text"
              >
                  Price  <sup>*</sup>
              </label>
              {errors.contentName && (
                  <span className='text-red-500 text-xs absolute'>
                    Price is required
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