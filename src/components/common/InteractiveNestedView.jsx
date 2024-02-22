import React from 'react'
import { AiOutlineFilePdf } from 'react-icons/ai'
import { GoVideo } from 'react-icons/go'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useSelector } from 'react-redux'

const InteractiveNestedView = ({sectionArray}) => {
    const {content} = useSelector((state) => state.content);
  return (
    <>
      {sectionArray.map((section) => 
        <details
            className='relative text-white'
        >
            <summary
                className='flex items-center justify-between mt-4 group'
            >
                <div className='flex items-center justify-between relative'>
                    <IoMdArrowDropdown 
                        // className={`${!rotate.includes(section?._id) && "-rotate-90"}`}
                        size={20}  
                    />
                    <p className='cursor-default text-lg font-poppins'>
                        {section.sectionName}
                    </p>
                </div>
                
                <div
                    className='absolute top-0 opacity-0 group-hover:opacity-100 group-hover:ease-in delay-1000 transition-all duration-200'
                >
                    <h2>
                        {section?.sectionName}
                    </h2>
                    <p>
                        {section?.sectionDescription}
                    </p>
                    {section.sectionImage && (
                        <img src={section?.sectionImage} 
                            className='object-contain w-[150px] h-[150px] rounded-lg'
                        />
                    )}
                </div>
            </summary>



            <div className='w-full pt-2'>
                {section?.subSections?.map((subSection, index) => (
                    <div className='flex group relative items-center justify-between px-5 pr-16 pb-2'
                        key={index}
                    >
                        <div className='flex items-center w-[35%] gap-x-2'>
                            {content?.contentType === "Video"
                                ? (<GoVideo 
                                    className='cursor-pointer hover:scale-90 transition-all duration-100'
                                    size={18}
                                />)
                                : (<AiOutlineFilePdf 
                                    className='cursor-pointer hover:scale-90 transition-all duration-100'
                                    size={18}
                                />)
                            }
                            <p className=''>{subSection?.title?.split("", 8).join("")}...</p>
                        </div>

                        <div
                            className='absolute bg-black top-0 opacity-0 group-hover:opacity-100 group-hover:ease-in delay-1000 
                            transition-all duration-200 border border-white rounded-lg'
                        >
                            <h2>
                                {subSection?.title}
                            </h2>
                            <p>
                                {subSection?.description}
                            </p>
                            {section.url && (
                                section.url.map((link) => (
                                    <video src={link} 
                                        className='object-contain w-[150px] h-[150px] rounded-lg'
                                    />
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </details>
      )}
    </>
  )
}

export default InteractiveNestedView