import React from 'react'
import Button from '../../../common/Button'

const NextAndPrevButton = ({
    handleGoBack,
    backIcon,
    backText,
    nextText,
    nextIcon,
    handleNext
}) => {
  return (
    <div className='flex items-center justify-end gap-x-6 text-white'>
        {/* Back Button */}
        <button className=' text-lg font-roboto box-border flex items-center gap-x-2 bg-gray-600 border border-white rounded-md px-5 py-2'
            onClick={handleGoBack}
        >
            {backIcon}
            {backText}
        </button>
        
        {/* Next Button */}
        <Button
            text={nextText}
            type="submit"
            customClasses="gap-x-2 item-center"
            handleOnClick={handleNext}
        >
            {nextIcon}
        </Button>
    </div>
        
  )
}

export default NextAndPrevButton