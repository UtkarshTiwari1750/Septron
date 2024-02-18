import React, { useEffect, useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { useSelector } from 'react-redux';

const TagInput = ({
  label,
  name,
  placeholder,
  errors,
  setValue,
  getValues,
  register
}) => {

  const {editContent, content} = useSelector((state) => state.content)
  const [tags, setTags] = useState([]);
  const handleKeyDown = (event) => {
    // Check if user press "Enter" or ","
    if(event.key === 'Enter' || event.key === ',') {
      // Prevent the default behavior of the event
      event.preventDefault();
      // Get the input value and remove any leading/trailing spaces
      const tagValue = event.target.value.trim();
      // Check if tagValue exists and is not already in the tags array
      if(tagValue && !tags.includes(tagValue)){
        const newTags = [...tags, tagValue];
        setTags(newTags);
        event.target.value = ""
      }
    }
  }

  // Function to handle Remove of the tag
  const handleRemoveTag = (removeIndex) => {
    const newTags = tags.filter((_, index) => index !== removeIndex)
    setTags(newTags);
  }

  useEffect(() => {
    if(editContent) {
      setTags(content?.tag);
    }
    register(name, {required: true, validate: (value) => value.length > 0})
  }, []);

  useEffect(() => {
    setValue(name, tags)
  }, [tags])
  
  return (
    <div className='flex justify-between items-start w-full gap-x-6'>
      <div className='w-[50%] text-lg font-poppins'>
        Tag <sup className='text-red-500'>*</sup>
        <p className='text-sm leading-normal w-[88%] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum atque eligendi, laudantium quam ducimus </p>
      </div>

      <div className='relative w-[70%]'>
        <input 
          type="text" 
          id='tag'
          className="font-poppins block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
          border border-gray-300 appearance-none dark:text-white dark:border-gray-600 
          dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none" 
          placeholder="" 
          onKeyDown={handleKeyDown}
        />

        <label htmlFor="tag"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
            -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
            dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 
            peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
            rtl:peer-focus:left-auto start-1 cursor-text"
        >
          {placeholder} <sup>*</sup>
        </label>
      
        {errors[name] && (
          <span className='ml-2 text-xs tracking-wide text-red-500'>
            {label} is required
          </span>
        )}
        <div className='flex gap-x-2 mt-2 flex-wrap gap-y-1'>
          {
            tags.map((tag, index) => (
              <div 
                key={index}
                className='flex text-xs justify-start gap-x-1 items-center font-roboto relative rounded-lg bg-gray-900
              py-1 px-2'
              >
                <p>{tag}</p>
                <button>
                  <IoIosClose size={25} onClick={(e) => {e.preventDefault(); handleRemoveTag(index)}}/>
                </button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default TagInput