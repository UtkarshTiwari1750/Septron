import React from 'react'
import { useSelector } from 'react-redux'

const BuyedContent = () => {
  const {user} = useSelector((state) => state.profile)
  console.log("USER...", user)

  return (
    <div className='text-white'>
      BuyedContent
    </div>
  )
}

export default BuyedContent