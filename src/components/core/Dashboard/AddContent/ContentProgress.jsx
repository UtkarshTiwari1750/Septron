import React, { useState } from 'react'
import ContentInfo from './ContentInfo';
import Gallery from './Gallery';
import AddSection from './AddSection';
import Overview from './Overview';
import Publish from "./Publish"
import { useSelector } from 'react-redux';
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
    <div>
        

        
    </div>
  )
}

export default ContentProgress