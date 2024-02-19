import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdArrowDropdown } from "react-icons/io";
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RiVideoAddFill } from "react-icons/ri";
import { setAddSubSection } from '../../../../../slices/subSectionSlice'
import { FaFilePdf } from "react-icons/fa";
import { AiOutlineFilePdf } from "react-icons/ai";
import { GoVideo } from "react-icons/go";
import { deleteSection, deleteSubSection } from '../../../../../services/operations/contentAPI';
import {setContent} from "../../../../../slices/contentSlice";

const NestedView = ({ handleChangeEditSectionName }) => {
    const dispatch = useDispatch();
    const {content} = useSelector((state) => state.content);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [rotate, setRotate] = useState([]);
    const {token} = useSelector((state) => state.auth);
    const handleDeleteSection = async(sectionId) => {
        try{
            console.log("UNDER HANDLE DELETE SECTION...");
            const data = {
                "sectionId": sectionId,
                "contentId": content?._id,
            };
            const result = await deleteSection(data, token);
            if(result) {
                dispatch(setContent(result));
            }
        } catch(error) {
            console.log("Error in Nested View Delete Section...", error);
        }
    }

    const handleDeleteSubSection = async(subSectionId, sectionId) => {
        try {
            const data = {
                "sectionId": sectionId,
                "subSectionId": subSectionId,
            };
            const result = await deleteSubSection(data, token);
            if(result) {
                dispatch(setContent(result));
            }
        } catch(error) {
            console.log("Error in Nested View Delete SubSection...", error);
        }
    }

    const handleEditSubSection = async(subSectionId) => {

    }
  return (
    <div className='text-white'>
        <div>
            {content?.contentSections?.map((section, index) => (
                <details 
                    className='flex items-center'
                    key={section._id} open
                >
                    <summary 
                        // PENDING
                        // onClick={() => setRotate((prev) => {
                        //     const newArray = (prev && prev.includes(section._id)) 
                        //     ? prev.filter((id) => id !== section?._id) 
                        //     : [...prev, section?.id];
                        //     console.log("New Array...", newArray);
                        //     }
                        // )}
                        className='flex items-center justify-between mt-4'>
                        <div className='flex items-center justify-between relative'>
                            <IoMdArrowDropdown 
                                className={`${!rotate.includes(section?._id) && "-rotate-90"}`}
                                size={20}  
                            />
                            <p className='cursor-default text-lg font-poppins'>
                                {section.sectionName}
                            </p>
                        </div>
                        <div className='flex items-center justify-between w-[40%]'>
                            <button
                                onClick={() =>
                                    handleChangeEditSectionName(
                                        section._id,
                                        section.sectionName
                                    )
                                }
                            >
                                <MdEdit
                                    className='cursor-pointer hover:scale-90 transition-all duration-100'
                                    size={23}
                                />
                            </button>
                            <span>|</span>
                            <button
                                // onClick={() => 
                                //     setConfirmationModal({
                                //         text1: "Delete this Section?",
                                //         text2: "All the Files in this Section will be deleted",
                                //         btn1Text: "Delete",
                                //         btn2Text: "Cancel",
                                //         btn1Handler: () => handleDeleteSection(section._id),
                                //         btn2Handler: () => setConfirmationModal(null)
                                //     })
                                // }
                                onClick={handleDeleteSection}
                            >
                                <RiDeleteBin6Line 
                                    className='cursor-pointer hover:scale-90 transition-all duration-100'
                                    size={23}
                                />
                            </button>
                            <span>|</span>
                            <div
                                onClick={() => dispatch(setAddSubSection(section._id))}
                                className=''
                            >   
                                {content?.contentType === "Video"
                                    ? (<RiVideoAddFill 
                                        className='cursor-pointer hover:scale-90 transition-all duration-100'
                                        size={23}
                                    />)
                                    : (<FaFilePdf 
                                        className='cursor-pointer hover:scale-90 transition-all duration-100'
                                        size={23}
                                    />)
                                }
                                
                            </div>
                        </div>
                    </summary>
                    
                    <div className='w-full pt-2'>
                        {section?.subSections?.map((subSection, index) => (
                            <div className='flex items-center justify-between px-5 pr-16 pb-2'
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

                                <div className='flex items-center justify-between w-[30%]'>
                                    <button
                                        onClick={() =>
                                            handleEditSubSection(
                                                subSection?._id
                                            )
                                        }
                                    >
                                        <MdEdit
                                            className='cursor-pointer hover:scale-90 transition-all duration-100'
                                            size={18}
                                        />
                                    </button>
                                    <span>|</span>
                                    <button
                                        // onClick={() => 
                                        //     setConfirmationModal({
                                        //         text1: "Delete this Section?",
                                        //         text2: "All the Files in this Section will be deleted",
                                        //         btn1Text: "Delete",
                                        //         btn2Text: "Cancel",
                                        //         btn1Handler: () => handleDeleteSubSection(subSection._id, section._id),
                                        //         btn2Handler: () => setConfirmationModal(null)
                                        //     })
                                        // }
                                        onClick={() => handleDeleteSubSection(subSection._id, section._id)}
                                        type='button'
                                    >
                                        <RiDeleteBin6Line 
                                            className='cursor-pointer hover:scale-90 transition-all duration-100'
                                            size={18}
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </details>
            ))}
        </div>
    
    </div>
  )
}

export default NestedView