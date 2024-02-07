import React from 'react'
import { useForm } from 'react-hook-form'
import Template from '../components/core/Auth/Template'

const Signup = () => {
  return (
    <Template
        heading="Sign Up"
        subheading="Let's Create an Account for some one special"
        formType="signup"
    />
  )
}

export default Signup