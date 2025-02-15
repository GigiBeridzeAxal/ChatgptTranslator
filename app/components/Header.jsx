import { ArrowDown, ArrowDownCircle, BookDown, Expand, MessagesSquare, MoveDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Howitworks from './Howitworks';
import Main from './Main';
import TranslatorComponent from './TranslatorComponent';

export default function Header() {

  const [engopened , setengopened] = useState(false)


  
  return (
   <div className='flex landingheader  items-center  p-[20px] justify-between' >
    <div className="logo flex items-center gap-[15px]">
      <div className="logoframe bg-indigo-500 p-[10px]">
        <MessagesSquare className='w-[35px] h-[35px]'></MessagesSquare>
      </div>
      <h1  >Translator Ai 
      </h1>
    </div>
    <section  className='flex items-center gap-[25px]' >
    </section>

    <div className="headerbuttons flex items-center gap-[10px]">
      <div className="language flex items-center justify-center relative flex-col gap-[10px]"><button onClick={() => engopened == true ? setengopened(false) : setengopened(true) } className="languagechooser flex items-center gap-[10px]">Eng <ArrowDownCircle className='size-[18px]'></ArrowDownCircle>
      </button> 
      <div style={engopened == true ? {display:'flex'} : {display:'none'}} className="div">
             

      </div>
 
      </div>
 
      <button className='p-[7px]' >Sign Up</button>

      <button className='p-[7px] bg-teal-500 text-white rounded-[3px]'>Get Started</button>
    </div>
    <div className="Menu hidden">
      <button><img width={30} src="Menu.png" alt="" /></button>
    </div>
   </div>
  )
}
