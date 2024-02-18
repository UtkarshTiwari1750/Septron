import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { AiFillCaretDown } from "react-icons/ai"
import { RiVideoUploadFill } from "react-icons/ri";
import { setAddSubSection } from '../../../../../slices/subSectionSlice'

const NestedView = ({ handleChangeEditSectionName }) => {
    const {content} = useSelector((state) => state.content);
    console.log("SECTION...", content);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const handleDeleteSection = async(sectionId) => {

    }

  return (
    <div className='text-white'>
        <div>
            {content?.contentSections?.map((section) => (
                <details 
                    className='flex items-center'
                    key={section._id} open>
                    <summary className='flex items-center justify-between'>
                        <div className='flex items-center justify-between'>
                            <RxDropdownMenu />
                            <p>
                                {section.sectionName}
                            </p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <button
                                onClick={() =>
                                    handleChangeEditSectionName(
                                        section._id,
                                        section.sectionName
                                    )
                                }
                            >
                                <MdEdit />
                            </button>
                            <button
                                onClick={() => 
                                    setConfirmationModal({
                                        text1: "Delete this Section?",
                                        text2: "All the Files in this Section will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleDeleteSection(section._id),
                                        btn2Handler: () => setConfirmationModal(null)
                                    })
                                }
                            >
                                <RiDeleteBin6Line />
                            </button>
                            <span>|</span>
                            <AiFillCaretDown />
                            <RiVideoUploadFill 
                                onClick={() => setAddSubSection(true)}
                                className='cursor-pointer '
                            />
                        </div>
                    </summary>
                </details>
            ))}
        </div>
    
    </div>
  )
}

export default NestedView