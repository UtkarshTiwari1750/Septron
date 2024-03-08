import React, { useEffect, useState } from 'react'
import { getFullContentDetails } from '../services/operations/contentAPI'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/core/WatchVideo/Sidebar';
import Comments from '../components/common/Comments';
import { IoPlaySkipForward } from "react-icons/io5";
import { IoPlaySkipBack } from "react-icons/io5";
import Review from '../components/core/WatchVideo/Review';


const WatchVideo = () => {
  const {token} = useSelector((state) => state.auth);
  const {contentId, sectionId, subSectionId} = useParams();
  const [content, setContent] = useState(null);
  const [sectionAndSubSection, setSectionAndSubSection] = useState({
    section: null,
    subSection: null,
    sectionIndex: null,
    subSectionIndex: null
  });
  const [nextVideo, setNextVideo] = useState({
    section: null,
    video: null,
    isFirst: false,
  })
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();
  const navigate = useNavigate();


  useEffect(() => {
      ;(async() => {
        if(!contentId || !sectionId || !subSectionId) {
          navigate("/dashboard/buyed-content")
        }
        else {
          try{
            setLoading(true);
            const result = await getFullContentDetails(contentId, token);
            console.log("RESULT...", result);
            setLoading(false)
            const currentSection = result?.contentSections.filter((section) => section._id === sectionId)[0];
            const currentVideo = currentSection?.subSections.filter((subSection) => subSection._id === subSectionId)[0];

            // console.log("Current Section....", currentSection);
            // console.log("Current Subsection...", currentVideo)

            const sectionIndex = result?.contentSections.findIndex((section) => section._id === currentSection._id)
            const subSectionIndex = currentSection?.subSections.findIndex((subsection) => subsection._id === currentVideo._id)
            let nextSection = null;
            let nextSubSection = null;
            let isFirst = false;
            if(subSectionIndex === currentSection.subSections.length-1) {
              if(sectionIndex === result.contentSections.length-1){
                nextSection = result.contentSections[0];
                nextSubSection = result.contentSections[0].subSections[0];
                isFirst = true;
              }
              else {
                let i;
                for(i = sectionIndex + 1; i < result.contentSections.length; i++) {
                  if(result.contentSections[i].subSections.length > 0) {
                    nextSection = result.contentSections[i];
                    break;
                  }
                }

                if(i == result.contentSections.length) {
                  nextSection = result.contentSections[0];
                  nextSubSection = result.contentSections[0].subSections[0];
                } else {
                  nextSubSection = nextSection.subSections[0];
                }
              }
            }
            else {
              nextSubSection = currentSection.subSections[subSectionIndex + 1];
            }       
            setNextVideo({
              section: nextSection,
              video: nextSubSection,
              isFirst: isFirst,
            })

            setSectionAndSubSection({
              section: currentSection,
              subSection: currentVideo,
              sectionIndex: sectionIndex,
              subSectionIndex: subSectionIndex
            });
            setContent(result);
          } catch(error) {
            console.log("Error...", error);
          }
        }
      })()
  }, [sectionId, subSectionId, contentId])

  const sectionDetails = sectionAndSubSection.section;
  const subSectionDetails = sectionAndSubSection.subSection;
  



  const handleNext = () => {
    let navigateUrl = `/view-content/${contentId}/`;
    if(sectionAndSubSection.subSectionIndex === sectionDetails.subSections.length - 1) {
      if(nextVideo.isFirst) {
        navigateUrl += `${nextVideo.section._id}/${nextVideo.video._id}`
      } else {
        navigateUrl += `${nextVideo.section._id}/${nextVideo.video._id}`
      }
    } else {
      navigateUrl += `${sectionDetails._id}/${nextVideo.video._id}`;
    }

    console.log("NAVIGATE URL...", navigateUrl);
    navigate(navigateUrl);
  }

  const handlePrev = () => {
  }

  console.log("Next video...", nextVideo);
  return (
    loading 
    ? 
    (<div className='w-full h-[calc(100vh-3.5rem)] flex justify-center items-center'>
      <div className='loader'></div>
    </div>) 
    :
    <div className='text-white p-5 pt-8'>
      {content && (
        <div>
          <div className='flex justify-between w-full gap-x-5 relative'>
            <div className='absolute h-full left-3'>
              <Sidebar content={content}/>
            </div>

            <div className={`w-[680px] mx-auto relative flex justify-center items-center`}>
              <video className="w-[680px] object-contain" 
                src={subSectionDetails.url} 
                autoPlay 
                muted 
                controls
                onEnded={() => handleNext()}
              />
            </div>
            
            <div className='w-[25%] h-full absolute right-0 rounded-md border border-white p-2'>
              <Comments />
            </div>
          </div>
          
          {/* Video Info */}
          <div className='w-[680px] mx-auto mt-3'>
            <h2 className='text-2xl font-poppins'>{subSectionDetails.title}</h2>
            <p className='text-white/40 font-roboto'>{subSectionDetails.description}</p>
          </div>

          {/* Content Info */}
          <div className='w-8/12 mx-auto py-5 flex gap-x-3 items-start justify-between'>
            <div className='flex items-center'>
              <img 
                src={content.thumbnail} 
                alt={content.contentName} 
                className='w-64'
              />

              <div>
                <div>
                  <h2 className='font-poppins text-2xl'>
                    {content.contentName}
                  </h2>
                  <p className='text-xs'>Genre | {content?.genre.name}</p>
                </div>

                <p>
                  {content.contentDescription}
                </p>
              </div>
            </div>
            
            
            {nextVideo && 
            (<div className='relative flex justify-center items-center group hover:scale-105 cursor-pointer transition-all duration-300'
              onClick={handleNext}
            >
              <video 
                className='w-64 rounded-md object-contain'
                src={nextVideo?.video.url[0]} 
                alt="" 
                muted
              />
              <div className='absolute bg-black/20 w-full h-full text-center flex justify-center items-center gap-x-1
                group-hover:bg-black/50 group-hover:text-lg transition-all duration-300 font-roboto '
              >
                <div className='flex items-center gap-1 rounded-md border-white border px-2 py-1'>
                  <p>
                    Next 
                  </p>
                  <IoPlaySkipForward />
                </div>
              </div>
            </div>)}

          </div>
            
          <Review />

        </div>
      )}
    
    </div>
  )
}

export default WatchVideo