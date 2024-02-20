import React from 'react'
import Comments from '../components/common/Comments'
import { useLocation, useParams } from 'react-router-dom'

const VideoDetails = () => {
    const {videoId} = useParams()
  return (
    <div className='text-white w-full '>
      <p>This video details page for id {videoId}</p>
      <Comments />
    </div>
  )
}

export default VideoDetails