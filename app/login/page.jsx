'use client'
import axios from 'axios';

import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';
import { Lock, MessagesSquare, User } from 'lucide-react';
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


    signin({email:formref.current[1].value,
      password:formref.current[2].value})




  }


  return (
    <div className="register w-[100%] h-[100vh] flex items-center justify-center">
      <div className="registerframe flex items-center justify-center flex-col">
  <div className="logoframe bg-indigo-500 w-[55px] rounded-[5px] h-[55px] p-[10px]">
         <MessagesSquare className='w-[35px] h-[35px]'></MessagesSquare>
       </div>
       <h1 className='text-[24px] mt-[10px] mb-[10px]' >Chat App</h1>
       <h1 className='text-[18px] text-gray-500' >Welcome Back ! </h1>
       <br /><br />
        <form onSubmit={(e) => SubmitForm(e)} ref={formref} className='authform flex flex-col items-center gap-[15px] ' >
        <button className='w-[320px] bg-gray-200 p-[10px] mb-[10px] flex items-center justify-center gap-[15px] text-black rounded-[5px]' onClick={() => window.location = process.env.NEXT_PUBLIC_BACKEND + 'google'} ><img width={30} src="Google.png" alt="" />Countinue With Google</button>



          <div className="line flex w-[100%] justify-center gap-[10px] items-center">
            <div className="line1 w-[120px] h-[1px] bg-white "></div>
            Sign In
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
                      <label style={{maxWidth:"400px"}} className='w-[100%]  text-start text-[14px] text-gray-400' htmlFor="">Password</label>
              <div className="input flex items-center gap-[5px] w-[100%]">
                <Lock className='size-[20px]' ></Lock>
 
                <input   type="text" placeholder='Enter Your Password' />

              </div>
                      </div>
                      

        
            <br />
                      <button style={{maxWidth:"400px"}}  className='w-[100%] rounded-[5px] p-[10px] bg-orange-600 text-white ' >Sign In</button>

          <div className="alreadyhaveaccount flex items-center justify-center gap-[5px]">Dont Have Account ? <a className='text-blue-500' href="/register">Click Here</a></div>

        </form>
      </div>
    </div>
  )
}
