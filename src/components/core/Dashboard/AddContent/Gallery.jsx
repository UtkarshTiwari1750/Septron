import React, { useEffect, useState } from 'react'
import Upload from './UploadComponent/Upload'
import { useForm } from 'react-hook-form'
import Button from '../../../common/Button'
import { MdNavigateNext } from "react-icons/md";
import { IoChevronBackSharp } from "react-icons/io5";
import {setContent, setEditContent, setStep} from "../../../../slices/contentSlice"
import { useDispatch, useSelector } from 'react-redux';
import storeToFirebase from '../../../../utils/storeToFirebase';
import { createGallery, updateGallery } from '../../../../services/operations/contentAPI';
import { setEditGallery, setImages, setVideos } from '../../../../slices/gallerySlice';
import toast from 'react-hot-toast';
import { setEditSection } from '../../../../slices/sectionSlice';

const Gallery = () => {
  const {
    register,
    formState: {errors},
    setValue,
    getValues,
    handleSubmit
  } = useForm()
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {content} = useSelector((state) => state.content);
  const {images, videos, editGallery} = useSelector((state) => state.gallery);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Check if Gallery is Updated or Not
  const isGalleryUpdated = () => {
    const currentValues = getValues();
    if(
      currentValues.image.toString() !== images.toString() ||
      currentValues.video.toString() !== videos.toString()
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Form Submit Controller
  const handleOnSubmit = async(data) => {
    // If form is in Edit Mode
    if(editGallery) {
      if(isGalleryUpdated()) {
        const currentValues = getValues();
        let images = [];
        let videos = [];
        
        const oldImagesUrl = data?.image.filter((img) => typeof(img) === 'string');
        const newImages = data?.image.filter((img) => typeof(img) === 'object');
        const oldVideosUrl = data?.video.filter((vid) => typeof(vid) === 'string');
        const newVideos = data?.video.filter((vid) => typeof(vid) === 'object');

        const toastId = toast.loading("Loading...");
        if(newImages.length > 0) {
          images = await storeToFirebase(newImages, user._id);
        }
        if(newVideos.length > 0) {
          videos = await storeToFirebase(newVideos, user._id);
        }

        images = oldImagesUrl.concat(images);
        videos = oldVideosUrl.concat(videos);
        setLoading(true);
        try{
          const result = await updateGallery(JSON.stringify(images), JSON.stringify(videos), content?.gallery?._id, content._id, token);
          const updatedContent = {...content};
          updatedContent["gallery"] = result;
          if(result) {
            dispatch(setImages(result?.images));
            dispatch(setVideos(result?.videos));
            dispatch(setStep(3));
            dispatch(setContent(updatedContent));
            dispatch(setEditGallery(null));
          }
        } catch(error) {
          console.log("ERROR while uploading to gallery....", error);
        }

        toast.dismiss(toastId);  
      } else {
        toast.error("No Changes made");
        toast.success("Continue without saving");
        dispatch(setStep(3));
        // dispatch(setEditSection(content?._id))
      } 
      return;
    }
    
    // First Time Creating Gallery
    const toastId = toast.loading("Loading...")
    if(data?.image?.length === 0 && data?.video?.length === 0) {
      dispatch(setStep(3));
    } else {
      let images = [];
      if(data?.image?.length > 0) {
        images = await storeToFirebase(data?.image, user._id);
      }
  
      let videos = [];
      if(data?.video?.length > 0) {
        videos = await storeToFirebase(data?.video, user._id);
      }
      
      setLoading(true);
      try{
        const result = await createGallery(JSON.stringify(images), JSON.stringify(videos), content._id, token);
        const updatedContent = {...content};
        updatedContent["gallery"] = result;
        if(result) {
          dispatch(setImages(result?.images));
          dispatch(setVideos(result?.videos));
          dispatch(setContent(updatedContent));
          dispatch(setStep(3));
        }
      } catch(error) {
        console.log("ERROR while uploading to gallery....", error);
      }
    }
    toast.dismiss(toastId);  
  }

  // Back Button Controller
  const handleGoBack = () => {
    dispatch(setEditContent(true));
    dispatch(setStep(1));
  }

  // To Initialize the Values during Edit Mode
  useEffect(() => {
    if(editGallery) {
      setValue("image", images);
      setValue("video", videos);
    }
  }, [])

  return (
    <form 
      onSubmit={handleSubmit(handleOnSubmit)}
      className='w-11/12 max-w-[1080px] mx-auto flex flex-col gap-y-6 p-5'
    >
      {/* For Image Upload */}
      <Upload 
        errors={errors}
        label="Enter Images"
        name="image"
        register={register}
        setValue={setValue}
        image={true}
        required={false}
        editData={editGallery ? content?.gallery?.images : null}
        multiInput={true}
      />

      {/* For Video Upload */}
      <div className='w-full mt-7'>
        <Upload 
          errors={errors}
          label="Enter Videos"
          name="video"
          register={register}
          setValue={setValue}
          video={true}
          required={false}
          multiInput={true}
          editData={editGallery ? content?.gallery?.videos : null}
        />
      </div>

      {/* Buttons */}
      <div className='flex items-center justify-end gap-x-6 text-white'>
        {/* Back Button */}
        <button className=' text-lg font-roboto box-border flex items-center gap-x-2 bg-gray-600 border border-white rounded-md px-5 py-2'
          onClick={handleGoBack}
        >
          <IoChevronBackSharp />
          Back
        </button>
        
        {/* Next Button */}
        <Button
          text="Next"
          type="submit"
          customClasses="gap-x-2 item-center"
        >
          <MdNavigateNext size={25}/>
        </Button>
      </div>
    </form>
  )
}

export default Gallery