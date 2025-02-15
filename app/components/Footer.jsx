import { Copyright, MessagesSquare } from 'lucide-react'
import React from 'react'

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

    <h1  className='text-[24px] text-blue-500'>Translator Ai 
    </h1>
    <div className="desc text-[20px] w-[250px]" >Everything You Need To Start Learning</div>
            </div>


            <div className="leftside w-[50%] flex items-start justify-evenly">

                <div className="footerlist flex flex-col items-start justify-start gap-[10px] text-[26px]">
                    Navigate

                    <button className="buttons text-[16px]">
                        How It Works 
                    </button>

                    <button className="buttons text-[16px]">
                        Register
                    </button>

                    <button className="buttons text-[16px]">
                        Login
                    </button>

                    <button className="buttons text-[16px]">
                        Dashboard
                    </button>

                </div>

                <div className="footerlist flex flex-col items-start justify-start gap-[10px] text-[26px]">
                    Legal

                    <button className="buttons text-[16px]">
                        Tearms Of Service
                    </button>

                    <button className="buttons text-[16px]">
                        Privacy Policy
                    </button>

                    <button className="buttons text-[16px]">
                        Cookies Policy
                    </button>


                </div>


            </div>

   






        </div>

        <div className="rights w-[85%] mt-[40px] flex items-center  gap-[5px] text-[20px]"><div className="allrightsserved flex items-center gap-[5px]"><Copyright></Copyright> 2025 Translator Ai. All Rights Served.</div></div>
          
    </div>
  )
}
