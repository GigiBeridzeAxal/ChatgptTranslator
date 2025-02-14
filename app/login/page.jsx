'use client'
import axios from 'axios';

import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';
export default function page() {
  const formref = useRef()
  const [registercode , setregcode] = useState(0)

  const {signin} = useAuthStore()


  const validateform = () => {

    if(!formref.current[0].value) return toast.error("Email Is Required")
      if(!formref.current[1].value) return toast.error("Password Is Required")
        if(formref.current[1].value.length < 8) return toast.error("Password Must Be 8 Character or Longer")
    return true
  }

  const SubmitForm = async(e) => {
    e.preventDefault();

    signin({      email:formref.current[0].value,
      password:formref.current[1].value})




  }


  return (
    <div className="register w-[100%] h-[100vh] flex items-center justify-center">
      <div className="registerframe">
        <form onSubmit={(e) => SubmitForm(e)} ref={formref} className='authform flex flex-col items-center gap-[15px] ' >
      
      
          <h1 className='text-[24px]' >Sign Up With</h1>
          <br />


          <div className="line flex w-[100%] justify-center gap-[10px] items-center">
            <div className="line1 w-[120px] h-[1px] bg-black "></div>
            Sign Up
            <div className="line1 w-[120px] h-[1px] bg-black "></div>
          </div>

          <input  type="email" placeholder='Enter Your Email' />


          <input  style={registercode == 204 ? {border:'1px solid red'} : null} type="text" placeholder='Enter Your Password' />

          <button  className='w-[320px] p-[6px] bg-teal-500 text-white ' >Sign In</button>

          <div className="alreadyhaveaccount flex items-center justify-center gap-[5px]">Dosen't Have Account ? <a className='text-blue-500' href="/register">Click Here</a></div>

        </form>
      </div>
    </div>
  )
}
