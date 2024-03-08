import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setComments } from '../../slices/commentSlice';
import io from "socket.io-client"
const socket = io.connect(process.env.REACT_APP_BACKEND_URL);

const Comments = () => {
    const {
        register,
        setValue,
        getValues,
        formState: {errors},
        handleSubmit,
    } = useForm();
    const {comments} = useSelector((state) => state.comment);
    const dispatch = useDispatch();

    const sendComment = (data) => {
        socket.emit("comment", {comment: data.comment});
    }

    useEffect(() => {
        socket.on("receive_comment", (data) => {
            dispatch(setComments(data?.comment));
        })
    }, [socket])
    return (
        <div className='w-full'>
            <div className='w-11/12 mx-auto max-w-[1080px]'>
                <form onSubmit={handleSubmit(sendComment)}
                    className='flex gap-x-3 items-center'
                >
                    <div className='relative w-[70%]'>
                        <textarea 
                            type="text" 
                            id='comment'
                            className="block px-10 pb-2.5 pt-4 h-[52px] w-full text-sm text-gray-900 bg-transparent rounded-full 
                            border border-gray-300 appearance-none dark:text-white dark:border-gray-600
                            dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none" 
                            placeholder=" " 
                            {...register("comment", {required: false})}
                        />
                        <label htmlFor="comment"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                            -translate-y-4 translate-x-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent font-poppins
                            dark:bg-[#000814] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:translate-x-2 peer-placeholder-shown:top-6 
                            peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:translate-x-4 rtl:peer-focus:translate-x-1/4 
                            rtl:peer-focus:left-auto start-1 cursor-text"
                        >
                            Comment
                        </label>
                    </div>

                    <button
                        type='submit'
                        className='rounded-lg px-3 py-1 font-roboto text-lg  border'
                    >
                        Send
                    </button>
                </form>

                {comments?.map((comment) => (
                    <div>
                        {comment};
                    </div>
                ))}
            </div>
        </div>
  )
}

export default Comments