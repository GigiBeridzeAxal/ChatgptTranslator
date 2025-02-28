'use client'
import { Copyright, MessagesSquare } from 'lucide-react'
import React from 'react'
import TranslatorComponent from './TranslatorComponent'

export default function Footer() {
  return (
    <div className="footer w-[100%] flex items-center flex-col justify-center p-[60px] bg-black">
        <div className="footerframe flex  justify-between items-start w-[85%]">


            <div className="logoinfo flex flex-col gap-[10px]">
            <div className="logo flex items-center gap-[15px]">
      <div className="logoframe bg-indigo-500 p-[10px]">
        <MessagesSquare className='w-[35px] h-[35px]'></MessagesSquare>
      </div>
    </div>

    <h1  className='text-[24px] text-blue-500'>번역자 당신
    </h1>
    <div className="desca text-[20px] w-[250px]" >학습을 시작하는 데 필요한 모든 것</div>
    <div className="lng"> 언어:<TranslatorComponent></TranslatorComponent></div>
            </div>


            <div className="leftside w-[50%] flex items-start justify-evenly">

                <div className="footerlist flex flex-col items-start justify-start gap-[10px] text-[26px]">
                탐색하다

                    <button className="buttons text-[16px]">
                    작동 원리
                    </button>

                    <button className="buttons text-[16px]">
                    등록하다
                    </button>

                    <button className="buttons text-[16px]">
                    로그인
                    </button>

                    <button className="buttons text-[16px]">
                    계기반
                    </button>

                </div>

                <div className="footerlist flex flex-col items-start justify-start gap-[10px] text-[26px]">
                합법적인

                    <button className="buttons text-[16px]">
                    서비스 약관
                    </button>

                    <button className="buttons text-[16px]">
                    개인정보 보호정책
                    </button>

                    <button className="buttons text-[16px]">
                    쿠키 정책
                    </button>
    


                </div>


            </div>

   






        </div>

        <div className="rights w-[85%] mt-[40px] flex items-center  gap-[5px] text-[20px]"><div className="allrightsserved flex items-center gap-[5px]"><Copyright></Copyright>2025 번역기 Ai. 모든 권리 제공.</div></div>
          
    </div>
  )
}
