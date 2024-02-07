import React, { useState } from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import { ACCOUNT_TYPE } from '../../../utils/constants'

const Template = ({heading, subheading, formType}) => {
    const [loading, setLoading] = useState(false);
    const [accountType, setAccountType] = useState("Normal");

  return (
    <div className='bg-[#000814] w-full h-[100vh] flex justify-center items-center overflow-hidden relative '>
        <div className='w-[340px] h-[340px] bg-white rounded-full absolute bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 top-0 right-0 blur-xl animate-spin'></div>
        <div className='w-[240px] h-[240px] bg-white rounded-full absolute bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% 
        blur-xl animate-bounce top-0 left-0'></div>
        {   
            loading 
            ? (<div className='spinner'></div>) 
            : 
            ( 
                <div className=' w-11/12 max-w-[1080px] flex justify-between items-end gap-5 mx-auto p-10 '>
                    {/* Left */}
                    <div className='flex flex-col items-start justify-center gap-y-5 w-[70%] p-6 rounded-xl backdrop-blur-lg'>
                        <h2 className='headingText'>{heading}</h2>
                        <p className='subheadingText'>{subheading}</p>
                        <div className='flex items-center justify-between gap-4 rounded-lg  w-[38%] bg-gray-800'>
                            <div className={`${accountType === ACCOUNT_TYPE.NORMAL 
                                ? "bg-gradient-to-r from-violet-600 to-indigo-600 inline-block text-white" 
                                : "text-gray-500"} 
                                rounded-lg px-4 py-2 cursor-pointer text-lg transition-all duration-300`
                            }
                                onClick={() => setAccountType(ACCOUNT_TYPE.NORMAL)}
                            >
                                Normal
                            </div>
                            <div className={`${accountType === ACCOUNT_TYPE.ARTIST
                                ? "bg-gradient-to-r from-violet-600 to-indigo-600 inline-block text-white" 
                                : "text-gray-500"} 
                                rounded-lg px-4 py-2 cursor-pointer text-lg transition-all duration-300`
                            }
                                onClick={() => setAccountType(ACCOUNT_TYPE.ARTIST)}
                            >
                                Artist
                            </div>
                        </div>
                        {formType === 'signup' ? (<SignupForm accountType={accountType}/>) : (<LoginForm accountType={accountType}/>)}
                    </div>

                    {/* Right */}
                    <div className='h-full w-[55%] p-6'>
                        <img 
                            src="https://media0.giphy.com/media/Al9XitEIwGgLU9yMfS/giphy.webp?cid=790b7611xr60w6fykbpznk7h379cdhcyua0mpherogah8gmj&ep=v1_gifs_search&rid=giphy.webp&ct=s" alt="" 
                            className='h-full w-full '
                        />
                    </div>
                </div>
            )
        }

    </div>
  )
}

export default Template