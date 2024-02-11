import React, { useState } from 'react'
import ContentInfo from './ContentInfo/ContentInfo';
import Gallery from './Gallery';
import AddSection from './AddSection';
import Overview from './Overview';
import Publish from "./Publish"
import { useSelector } from 'react-redux';
import { FaCheck } from "react-icons/fa"

const ContentProgress = () => {
    const {step} = useSelector((state) => state.content);
    const steps = [
        {
            id: 1,
            title: "Content Info",
            component: <ContentInfo />
        },
        {
            id: 2,
            title: "Gallery",
            component: <Gallery />
        },
        {
            id: 3,
            title: "Add Section",
            component: <AddSection />
        },
        {
            id: 4,
            title: "Overview",
            component: <Overview />
        },
        {
            id: 5,
            title: "Publish",
            component: <Publish />
        }
    ];

  return (
    <>
        <div className='text-white flex w-full justify-between items-center p-4 mt-4'>
            {
                steps.map((item) => (
                    <div
                        key={item.id}
                        className='flex items-center gap-4 w-full px-2'
                    >
                        <div className={`relative ${item.id < steps.length ? "w-full" : "pl-4" } flex justify-center`}>
                            <div
                                className={`border rounded-full p-3 w-[50px] h-[50px] text-xl text-center flex items-center justify-center
                                ${step === item.id ? " border-yellowNeon text-yellowNeon" : "border-gray-500 text-gray-500"} 
                                ${item.id < step ? "bg-yellowNeon text-black" : ""}
                                `}         
                            >   
                                {
                                    item.id < step 
                                    ? (<FaCheck className="text-black"/>)
                                    : (item.id) 
                                }
                                
                            </div>

                            <p className={`absolute -bottom-7 ${item.id <= step ? "text-yellowNeon" : "text-gray-500"}`}>
                                {item.title}
                            </p>

                        </div>
                        {
                            item.id !== steps.length && (
                                <div 
                                    className={`h-[1px] w-full border-white border border-dashed
                                    ${item.id < step ? "border-yellowNeon" : "border-gray-500"}`}
                                >
                                </div>
                            )
                        }

                    </div>
                ))
            }
        </div>
        <div className='mt-6'>
            {
                steps.map((item) => {
                    if(step === item.id)
                        return item.component;
                    return null; 
                })
            }
        </div>
    </>
  )
}

export default ContentProgress