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
            <table className='w-full'>
                <tr className=''>
                    <th>Thumbnail</th>
                    <th>Details</th>
                    <th>Price</th>
                    <th>Content Type</th>
                </tr>
                {artistContent.map((content, index) => (
                    <tr className='w-full flex justify-between items-center' 
                        key={index}
                    >
                        <td className='flex justify-between items-center gap-x-4   '>
                            <img 
                                src={content?.thumbnail} 
                                alt={content?.contentName} 
                                className='w-[150px] h-[150px] object-contain'
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
                        </td>
                        <div>
                            {/* PENDING:- TotalDuration */}
                            <p>{content?.totalDuration}</p> 
                        </div>
                        <td>
                            <p>₹ {content?.price}</p>
                        </td>
                        <td>
                            <p>{content?.contentType === "Video" ? "Anime" : "Comic"}</p>
                        </td>
                        <td>
                            <button 
                                className='flex items-center rounded-lg border-white p-4 bg-slate-500 text-black hover:bg-slate-800'
                                onClick={() => handleDeleteContent(index)}
                            >
                                <RiDeleteBin6Line />
                                <p>Delete</p>
                            </button>
                        </td>
                    </tr>
                ))}
            </table>
        )
        }
        
    </div>
  )
}

export default MyContent