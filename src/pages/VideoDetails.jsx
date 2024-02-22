import React, { useState } from 'react'
import Comments from '../components/common/Comments'
import { useLocation, useParams } from 'react-router-dom'
import { loadData } from '../utils/animeAPI/anime'
import { getContentDetails } from '../services/operations/contentAPI'
import toast from 'react-hot-toast'

const VideoDetails = () => {
    const {videoId} = useParams()
    const [animeOrArtistContent, setAnimeOrArtistContent] = useState({
      title: "",
      englishName: "",
      description: "",
      image: "",
      genre: "",
      releasedDate: "",
      status: "",
    })

    const fetchData = async() => {
      const animeData = await loadData();
      const artistContent = await getContentDetails(videoId);
      if(!animeData && !artistContent) {
        toast.error("No Content Found");
      }
      
    }
    // fetchData();
    return (
    <div className='text-white w-full '>


      <p>This video details page for id {videoId}</p>
      <Comments />
    </div>
  )
}

export default VideoDetails