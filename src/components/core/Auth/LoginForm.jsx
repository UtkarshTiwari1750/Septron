import React from 'react'
import { useForm } from 'react-hook-form';

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm();
  return (
    <div>LoginForm</div>
  )
}

export default LoginForm