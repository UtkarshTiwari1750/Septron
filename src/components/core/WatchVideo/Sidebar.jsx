import React from 'react'
import { GoVideo } from "react-icons/go";

const Sidebar = ({content}) => {

  return (
    <div>
        <div className='backdrop:blur-sm bg-white/45 rounded-lg p-3 flex flex-col gap-y-3'>
            {content.contentSections && content.contentSections.map((section, index) => (
                <details key={index}>
                    <summary className='text-lg font-roboto'>
                        {section?.sectionName}
                    </summary>

                    <div className='ml-4'>
                        {section.subSections && section.subSections.map((subSection, index) => (
                            <div key={index} className='flex items-center gap-x-2'>
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