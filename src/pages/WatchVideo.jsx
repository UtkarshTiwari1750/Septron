import React, { useEffect, useState } from 'react'
import { getFullContentDetails } from '../services/operations/contentAPI'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/core/WatchVideo/Sidebar';
import Comments from '../components/common/Comments';

const WatchVideo = () => {
  const {token} = useSelector((state) => state.auth);
  const {contentId, sectionId, subSectionId} = useParams();
  const [content, setContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      ;(async() => {
        if(!contentId || !sectionId || !subSectionId) {
          navigate("/dashboard/buyed-content")
        }

          const result = await getFullContentDetails(contentId, token);
          console.log("RESULT...", result);


          setContent(result);
      })()
  }, [])


  return (
    <div className='text-white p-5'>
      {content && (
        <div className='flex justify-between w-full gap-x-5'>

          <div>
            <Sidebar content={content}/>
          </div>
          <div className='w-[680px] mx-auto'>
            <h2>{content?.contentName}</h2>
            <video src={content?.contentSections[0].subSections[0].url[0]} autoPlay muted controls></video>
          </div>
          <div className='w-[20%]'>
            <Comments />

          </div>
        </div>
      )}
    
    </div>
  )
}

export default WatchVideo