'use client'
import axios from 'axios';

import React, { useRef, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import toast, { Toaster } from 'react-hot-toast';
import { MessageSquare } from 'lucide-react';

export default function page() {
  const formref = useRef()
  const {checkauth , Authuser , signup} = useAuthStore()

  
  const validateform = () => {

    if(!formref.current[0].value) return toast.error("Email is Required")
      if(!formref.current[1].value) return toast.error("First Name Is Required")
        if(!formref.current[2].value) return toast.error("Last Name Is Required")
          if(!formref.current[3].value) return toast.error("Password Is Required")
            console.log(formref.current[3].value.length)
            if(formref.current[3].value.length < 8) return toast.error("Password must be 8 character longer")




    
    return true

  }


  const SubmitForm = async(e) => {
    e.preventDefault();

    const success = validateform()

    if(success === true){
      console.log('its ture')
      signup({email:formref.current[0].value,
        firstname:formref.current[1].value,
        lastname:formref.current[2].value,
        password:formref.current[3].value,})

    }






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

          <input  type="text" placeholder='Enter Your First Name' />
          
          <input  type="text" placeholder='Enter Your Last Name' />

          <input   type="text" placeholder='Enter Your Password' />

          <button  className='w-[320px] p-[6px] bg-teal-500 text-white ' >Sign Up</button>

          <div className="alreadyhaveaccount flex items-center justify-center gap-[5px]">Already Have Account ? <a className='text-blue-500' href="/login">Click Here</a></div>

        </form>
      </div>
    </div>

  )
}
