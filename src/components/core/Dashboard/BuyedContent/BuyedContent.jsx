import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getBuyedContent } from '../../../../services/operations/profileAPI';

const BuyedContent = () => {
  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const [buyedContent, setBuyedContent] = useState([]);
  useEffect(() => {
    ;(async() => {
      try {
        const response = await getBuyedContent(token);
        if(response) {
          setBuyedContent(response);
        }
      } catch(error) {
        console.log("Unable to fetch buyed content")
      }
    })()
  }, [])

  console.log("RESPONSE...", buyedContent);

  return (
    <div className='text-white'>
      <div className='flex flex-wrap gap-y-5'>
        {
          buyedContent?.map((content) => (
            <div>
              <img 
                src={content?.thumbnail} 
                alt={content?.contentName} 
                className='w-40 h-40 object-contain'
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default BuyedContent