import { Gamepad } from 'lucide-react'
import React from 'react'

export default function Games() {
  return (
    <div className='flex gap-[20px] pt-[144px]  justify-center flex-col flex-wrap w-[100%] p-[40px]'>

        <h1 className='flex items-center justify-cneter gap-[10px]'><Gamepad></Gamepad>Games</h1>

        <div className='flex gamelistimages items-center gap-[45px]'>

         <img width={350} height={350} src="LotteryGame.jpg" alt="" />
         <img width={350} height={350} src="Bingo.jpg" alt="" />


        </div>



    

    </div>
  )
}
