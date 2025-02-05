import React from 'react'

export default function Main() {
  return (
    <div className="main flex items-center justify-center">
    <div className="mainbackground relative flex items-center justify-center flex-col gap-[25px] w-[100%] h-[100%] ">
       <div className="haundredlanguage"><img src="100+Language.png" alt="" /></div>
       <div className="ChatWithOtherPeople"><img src="ChatWithOtherPeople.png" alt="" /></div>

      <img src="Logobig.png"  alt="" />
      <div className="maintittle text-[62px] text-center">Join , Select Language , Start Learning</div>
      <div className="maindesc text-gray-500 text-[66px] text-center">All In One Place</div>
      <div className="mainword text-center">Efficenty Learn Any Language</div>
      <button className=' w-[130px] p-[10px] bg-teal-500 text-white rounded-[3px]'>Try Free</button>
</div>
    </div>

  )
}
