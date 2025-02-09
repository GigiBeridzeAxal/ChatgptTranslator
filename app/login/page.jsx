'use client'
import axios from 'axios';

import React, { useRef, useState } from 'react'
export default function page() {
  const formref = useRef()
  const [registercode , setregcode] = useState(0)

  const SubmitForm = async(e) => {
    e.preventDefault();


    const send = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "Login" , {
      email:formref.current[0].value,
      password:formref.current[1].value
    }) 


    setregcode(send.status)
    if(send.status == 200){
     const setcookie = await axios.post('/api/jwtcookieset' , {jwt:send.data})

     if(setcookie.status == 200){
      window.location = '/'
     }
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
          {registercode == 202 ? <div className="text-red-500">Account Didn't Exist</div> : null}
          {registercode == 203 ? <div className="text-red-500">Email Already Registered</div> : null}
          {registercode == 204 ? <div className="text-red-500">Password Didn't Match !</div> : null}
          <input required type="email" placeholder='Enter Your Email' />


          <input required minLength={8} style={registercode == 204 ? {border:'1px solid red'} : null} type="text" placeholder='Enter Your Password' />

          <button required className='w-[320px] p-[6px] bg-teal-500 text-white ' >Sign In</button>

          <div className="alreadyhaveaccount flex items-center justify-center gap-[5px]">Dosen't Have Account ? <a className='text-blue-500' href="/register">Click Here</a></div>

        </form>
      </div>
    </div>
  )
}
