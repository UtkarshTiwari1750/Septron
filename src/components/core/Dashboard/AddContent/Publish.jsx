import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { COURSE_STATUS } from '../../../../utils/constants';
import { resetContentState, setStep } from '../../../../slices/contentSlice';
import { useNavigate } from 'react-router-dom';
import { updateContent } from '../../../../services/operations/contentAPI';
import NextAndPrevButton from './NextAndPrevButton';

const Publish = () => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const {content} = useSelector((state) => state.content); 
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToContents = () => {
    dispatch(resetContentState());
    navigate("/dashboard/my-content");
  }

  const editForm = () => {
    if((content?.status === COURSE_STATUS.DRAFT && getValues("public") === false) 
    || (content?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true)) {
      return false;
    }
    return true;
  }

  const onSubmit = async(data) => {
    if(!editForm()) {
      goToContents();
      return;
    } 

    const formData = new FormData();
    formData.append("contentId", content._id);
    const contentStatus = getValues("public") 
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", contentStatus);

    const result = await updateContent(formData, token)
    if(result) {
      goToContents();
    }
  }

  return (
    <div className='text-white'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input 
            type="checkbox" 
            id='public'
            {...register("public")}
            className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
          />
          <span>Make this Content as Public</span>
        </div>

        <NextAndPrevButton 
          backText="Overview"
          handleGoBack={() => dispatch(setStep(4))}
          nextText="Done"
        />
      </form>
    
    </div>
  )
}

export default Publish