import React, { useEffect, useState } from 'react'
import { GoVideo } from "react-icons/go";
import { useParams, useNavigate } from "react-router-dom"
const Sidebar = ({content}) => {
    const {sectionId, subSectionId} = useParams();
    const [activeSection, setActiveSection] = useState(null);
    const [activeSubSection, setActiveSubSection] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        ;(() => {
            const currentSection = content.contentSections.filter((section) => section._id === sectionId)[0];
            const currentSubSection = currentSection.subSections.filter((subSection) => subSection._id === subSectionId)[0];
            
            console.log("CURRENT SECTION...", currentSection)
            console.log("CURRENT SUBSECTION...", currentSubSection)

            setActiveSection(currentSection);
            setActiveSubSection(currentSubSection);
        })()
    }, [sectionId,subSectionId])

  return (
    <div className='w-full h-full'>
        <div className='backdrop-blur-md rounded-lg px-2 py-2 shadow-lg ring-1 ring-black/5 bg-white/20 isolate h-full p-2 flex flex-col gap-y-3 w-52'>
            {content.contentSections && content.contentSections.map((section, index) => (
                <details key={index} open={activeSection && activeSection._id === section._id}>
                    <summary className={`${activeSection && activeSection._id === section._id && "bg-black/50"} px-2 py-1 rounded-t-md text-lg font-roboto`}>
                        {section?.sectionName}
                    </summary>

                    <div className={`${activeSection && activeSection._id === section._id && "bg-black/50"} pl-3 px-2 flex flex-col gap-y-2 py-2`}>
                        {section.subSections && section.subSections.map((subSection, index) => (
                            <div key={index} className={`${activeSubSection && activeSubSection._id === subSection._id && "bg-gray-200 text-black"} 
                                rounded-sm px-2 cursor-pointer flex items-center gap-x-2 hover:scale-105 transition-all duration-300 font-poppins`}
                                onClick={() => navigate(`/view-content/${content._id}/${section._id}/${subSection._id}`)}
                            >
                                <GoVideo />
                                {subSection.title}
                            </div>
                        ))}
                    </div>
                </details>
            ))}

        </div>
    
    </div>
  )
}

export default Sidebar