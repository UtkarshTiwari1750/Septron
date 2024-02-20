import React from 'react'

const ConfirmationModal = ({modalData}) => {
    const {
        text1,
        text2,
        gif,
        btn1Text,
        btn2Text,
        btn1Handler,
        btn2Handler
    } = modalData;
  return (
    <div className='fixed inset-0 z-[1000] bg-white bg-opacity-10 backdrop-blur-sm mt-0 grid place-items-center overflow-auto'>
        <div className='w-11/12 max-w-[350px] rounded-lg p-6 backdrop-blur-sm bg-[#1c2a43e0]'>
    
            <h2 className='text-3xl font-semibold text-white'>
                {text1}
            </h2>
            <p className='mt-3 mb-5 leading-6  font-bold text-lg bg-gradient-to-tr from-orange-400 text-transparent to-red-500 bg-clip-text'>
                {text2}
            </p>
            {
                gif && (
                    <img src={gif} alt="Don't Leav" 
                        className='rounded-lg'
                    />
                )
            }
            
            <div className='flex justify-end items-center mt-5 gap-x-4 text-white'>
                <button
                    className='bg-[#FFFF33] text-red-600 font-semibold px-4 py-2 rounded-lg bg-opacity-80'
                    onClick={(e) => {
                        e.preventDefault();
                        btn1Handler();
                    }}
                >
                    {btn1Text}
                </button>
                <button
                    onClick={btn2Handler}
                    className='bg-gray-400 px-4 py-2 font-semibold rounded-lg text-red-600 bg-opacity-80'
                >
                    {btn2Text}
                </button>

            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal