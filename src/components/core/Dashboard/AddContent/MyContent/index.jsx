import React, { useEffect, useState } from 'react'
import { deleteContent, getArtistContent } from '../../../../../services/operations/contentAPI';
import { useSelector } from 'react-redux';
import { RiDeleteBin6Line } from "react-icons/ri";


const MyContent = () => {
    const [artistContent, setArtistContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);
    useEffect(() => {
        ;(async() => {
            setLoading(true);
            try{
                const respose = await getArtistContent(token);
                console.log("Response in My-Content Component...", respose);
                if(respose) {
                    setArtistContent(respose);
                }
            } catch(error) {
                console.log("Error in MyContent Component...", error);
            }
            setLoading(false);
        })()
    }, [])

    const handleDeleteContent = async(index) => {
        try{
            await deleteContent(artistContent[index]._id, token);
            const result = await getArtistContent(token);
            if(result) {
                setArtistContent(result);
            }
        } catch(error) {
            console.log("Error in My-Content Component...", error);
        }
    }
  return (
    <div className='w-full text-white h-[calc(100vh-5.5rem)] flex items-center justify-center'>
        {loading 
        ? <div className='loader'></div> 
        : (
            <div className='w-full'>
                {artistContent.map((content, index) => (
                    <div className='w-full flex justify-between items-center' 
                        key={index}
                    >
                        <div className='flex justify-between items-center'>
                            <img 
                                src={content?.thumbnail} 
                                alt={content?.contentName} 
                            />

                            <div>
                                <h2>
                                    {content?.contentName}
                                </h2>
                                <p>
                                    Created: {content?.createdAt}
                                </p>
                                <p>
                                    {content?.status}
                                </p>
                            </div>
                        </div>
                        <div>
                            {/* PENDING:- TotalDuration */}
                            <p>{content?.totalDuration}</p> 
                        </div>
                        <div>
                            <p>{content?.price}</p>
                        </div>
                        <div>
                            <p>{content?.contentType}</p>
                        </div>
                        <div>
                            <button 
                                className='flex items-center rounded-lg border-white p-4 bg-slate-500 text-black hover:bg-slate-800'
                                onClick={() => handleDeleteContent(index)}
                            >
                                <RiDeleteBin6Line />
                                <p>Delete</p>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )
        }
        
    </div>
  )
}

export default MyContent