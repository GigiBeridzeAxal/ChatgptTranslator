
import React from 'react'

export default function Main() {
  return (
    <div className="main flex items-center justify-center">
    <div className="mainbackground text-white font-[700] relative flex items-center pt-[150px] flex-col gap-[25px] w-[100%] h-[100%] ">

      <div className="learnlanguage text-[20px]">100개 이상의 언어를 배우세요</div>
      <div className="chatwithpeople text-center w-[80%] ">실제 사람과 대화하고 단시간에 모든 언어를 마스터하세요</div>
      <a href='/register'  className= 'startnowbtn p-[10px] text-center bg-blue-500 w-[150px] rounded-[5px]' >지금 시작하세요</a>
      <img width={300} src="PhoneMessaging.png" className='mt-[15px]' alt="" />

      
   
 
</div>
    </div>

  )
}
