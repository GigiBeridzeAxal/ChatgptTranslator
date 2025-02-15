import React from 'react'

export default function Howitworks() {
  return (
   <div className="howitworks relative">
    <div className="lights"></div>
    <div className="lights2"></div>
    <div className="howitworksframe flex flex-col items-center ">
        <h1 className="hoitworkstittle w-[100%] flex items-center justify-center text-[64px] mt-[25px] font-[600]">How it Works ?</h1>
        <h2 className='text-white text-center flex items-center justify-center mt-[25px] text-[24px] w-[50%]' >You enter the application, then you select the languages ​​you can speak, you also select the languages ​​you want to learn, then you enter the panel where there are other people with whom you can start talking and learning.</h2>
        <br />
        <div className="steps flex items-center justify-evenly w-[80%] gap-[25px]">
          <div className="woman1">
            <div className="womandesc text-white">This Is Ana He is Speaking German Language from 3 years He Wants To Learn English And Practice</div>
          </div>
          <div className="woman2">
          <div className="womandesc text-white">This Is Mziuri He is Speaking English Language from 2 years He Wants To Learn German Language</div>
          </div>

          <div className="find mt-[64px] flex items-center justify-around ">
          <img width={300} src="messaging.png" alt="" />

          <div className="text-white howitworkstext text-[36px] flex-col flex gap-[25px] w-[30%]">
            They will find each other and start corresponding, and the learning process will be facilitated by the tools we offer.
            <div className="youcanalso">You can also find other People around the world in 100+ languages. </div>
            <a href='/register'  className= 'startnowbtn p-[10px] text-[16px] text-center bg-blue-500 w-[150px] rounded-[5px]' >Start now</a>
          </div>
          </div>

        </div>

        <br />          <br />          <br />
    </div> 
   </div>
  )
}
