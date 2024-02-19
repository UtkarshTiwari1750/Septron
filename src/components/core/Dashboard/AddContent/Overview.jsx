import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getContentDetails } from '../../../../services/operations/contentAPI';

const Overview = () => {
  const {content} = useSelector((state) => state.content);
  const [overviewData, setOverviewData] = useState(null);  

  useEffect(() => {
    ;(async() => {
      try {
        const result = await getContentDetails(content?._id);
        console.log("Content...", result);
      } catch(error){
        console.log("Error in Overview Component...", error);
      }
    })()
  }, []);
  return (
    <div>
      <div>
        
      </div>
    
    </div>
  )
}

export default Overview