import React from 'react'
import {deleteAccount} from "../../../../services/operations/profileAPI"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
const Setting = () => {
  const {token} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDeleteAccount = async() => {
    await deleteAccount(dispatch, token, navigate)
  }

  return (
    <div>
        <button
          onClick={handleDeleteAccount} 
          className='px-3 py-4 rounded-lg border border-white text-white'
        >
            Delete Account
        </button>
    </div>
  )
}

export default Setting