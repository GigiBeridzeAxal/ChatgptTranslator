
import React from 'react'

export default function Main() {
  return (
    <div className="main flex items-center justify-center">
    <div className="mainbackground text-white font-[700] relative flex items-center pt-[150px] flex-col gap-[25px] w-[100%] h-[100%] ">

      <div className="learnlanguage text-[20px]">Learn 100+ Language</div>
      <div className="chatwithpeople text-center w-[80%] ">Talk To Real People And Master Any Language In Short Time</div>
      <a href='/register'  className= 'startnowbtn p-[10px] text-center bg-blue-500 w-[150px] rounded-[5px]' >Start now</a>
      <img width={300} src="PhoneMessaging.png" className='mt-[15px]' alt="" />

      
   
 
</div>
    </div>

  )
}
