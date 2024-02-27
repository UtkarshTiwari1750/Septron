import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getBuyedContent } from '../../../../services/operations/profileAPI';
import RatingStars from '../../../common/RatingStars';
import { Link } from 'react-router-dom';

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

  return (
    <div className='text-white mx-auto w-11/12 mt-6'>
      <h2 className='text-4xl font-poppins'>Buyed Contents</h2>
      <div className='flex flex-wrap gap-y-9 gap-x-5 mt-6'>
        {
          buyedContent?.map((content) => (
            <Link 
              to={`/video/${content._id}`}
              className='hover:scale-105 cursor-pointer transition-all duration-300'
            >
              <div className='relative group'>
                <div className='absolute h-full w-full bg-black/75 opacity-0 rounded-xl 
                  p-4 group-hover:opacity-100 transition-all duration-300'
                >
                  <h2 className='font-roboto text-base'>{content?.contentName}</h2>

                  <p title={content?.contentDescription}
                    className='text-sm mt-2 font-roboto'
                  >
                    {content?.contentDescription?.split("", 70).join("")} 
                    {content?.contentDescription?.length <= 70 ? "" : "..."}
                  </p>


                </div>
                
                <img 
                  src={content?.thumbnail} 
                  alt={content?.contentName} 
                  className='w-64 h-44 object-cover rounded-xl shadow-md shadow-pink-600 '
                />
              </div>

              <div className='flex justify-between items-center mt-2 px-1 py-2'>
                <h2 className='font-roboto'>{content?.contentName.split("", 18).join("")}{content?.contentName?.length <= 18 ? "" : "..."}</h2>

                <p>{<RatingStars Review_Count={content?.totalRating ? content?.totalRating : 0} Star_Size={17}/>}</p>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default BuyedContent