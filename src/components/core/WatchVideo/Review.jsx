import React from 'react'
import ReactStars from "react-rating-stars-component";

const Review = () => {
  return (
    <div>
      <input type="text" name="" id="" />
      <ReactStars 
        count={5}
        // onChange={ratingChanged}
        size={24}
        activeColor="#ffd700"
        isHalf={true}
      />
    </div>
  )
}

export default Review