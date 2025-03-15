'use client'
import axios from 'axios';

import React, { useRef, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import toast, { Toaster } from 'react-hot-toast';
import { Book, Lock, MessageSquare, MessagesSquare, User } from 'lucide-react';



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

  const responseGoogle = (token) => {
    console.log(token)
  }

  return (
   <> 
   
   <div className="register w-[100%] h-[100vh] flex items-center justify-center">
      <div className="registerframe text-center flex flex-col items-center gap-[15px]" >
      <div className="logoframe bg-indigo-500 w-[55px] rounded-[5px] h-[55px] p-[10px]">
        <MessagesSquare className='w-[35px] h-[35px]'></MessagesSquare>
      </div>
      <h1 className='text-[24px]' >Chat App</h1>
      <h1 className='text-[18px] text-gray-500' >Find People</h1>
          <br />
          <a href='https://chatgptranslatorbackend.onrender.com/google' className='w-[320px] bg-gray-200 text-black p-[10px] flex items-center justify-center gap-[15px] text-black rounded-[5px]'  ><img width={30} src="Google.png" alt="" />Countinue With Google</a>

        <form onSubmit={(e) => SubmitForm(e)} ref={formref} className='authform flex flex-col mt-[15px] items-center gap-[15px] ' >




          <div className="line flex w-[100%] justify-center gap-[10px] items-center">
            <div className="line1 w-[120px] h-[1px] bg-white "></div>
            Sign Up
            <div className="line1 w-[120px] h-[1px] bg-white "></div>
          </div>
          
           
              <div className='w-[100%] text-start flex items-center justify-center flex-col'>
                      <label style={{maxWidth:"400px"}} className='w-[100%]  text-start text-[14px] text-gray-400' htmlFor="">Email</label>
         
                      <div className="input flex items-center gap-[5px] w-[100%]">
                <User className='size-[20px]'></User>
              <input  type="email" className=' w-[100%] ' placeholder='Enter Your Email' />

              </div>
                      </div>
            
                      <div className='w-[100%] text-start flex items-center justify-center flex-col'>
                      <label style={{maxWidth:"400px"}} className='w-[100%]  text-start text-[14px] text-gray-400' htmlFor="">First Name</label>
              <div className="input flex items-center gap-[5px] w-[100%]">
                <Book className='size-[20px]'></Book>
                <input  type="text" placeholder='Enter Your First Name' />
              </div>

                      </div>
            
                      <div className='w-[100%] text-start flex items-center justify-center flex-col'>
                      <label style={{maxWidth:"400px"}} className='w-[100%]  text-start text-[14px] text-gray-400' htmlFor="">Last Name</label>
                      <div className="input flex items-center gap-[5px] w-[100%]">
                <Book className='size-[20px]'></Book>
          
                <input  type="text" placeholder='Enter Your Last Name' />

              </div>
                      </div>
              
             
                      <div className='w-[100%] text-start flex items-center justify-center flex-col'>
                      <label style={{maxWidth:"400px"}} className='w-[100%]  text-start text-[14px] text-gray-400' htmlFor="">Password</label>
              <div className="input flex items-center gap-[5px] w-[100%]">
                <Lock className='size-[20px]' ></Lock>
 
                <input   type="text" placeholder='Enter Your Password' />

              </div>
                      </div>
              
             
     
    
    
<br />


          <button style={{maxWidth:"400px"}}  className='w-[100%] rounded-[5px] p-[10px] bg-orange-600 text-white ' >Register</button>

          <div className="alreadyhaveaccount flex items-center justify-center gap-[5px]">Forgot Password ? <a className='text-blue-500' href="/login">Click Here</a></div>

        </form>
      </div>
    </div>



   </>
  )
}
