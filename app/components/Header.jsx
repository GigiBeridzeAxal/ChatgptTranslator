import { ArrowDown, ArrowDownCircle, BookDown, Expand, LogOut, MessagesSquare, MoveDown, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Howitworks from './Howitworks';
import Main from './Main';
import TranslatorComponent from './TranslatorComponent';

export default function Header() {

  const [engopened , setengopened] = useState(false)
  const [menuopened , setmenuopened] = useState(false)


  
  return (
   <div className='flex landingheader  items-center  p-[20px] justify-between' >

    {menuopened == true  ? 
    
    <div className="openedmenu  p-[20px]">
      <div className="menuline w-[100%] flex items-center justify-between">Menu  <button onClick={() => setmenuopened(false)} ><X className='text-red-500' ></X></button></div>
<br /><br />
      <div className="flex flex-col items-start justify-start gap-[10px]">
      <a className='text-[24px] text-start w-[120px]  rounded-[5px]' href="/register">Dashboard</a>
        <a className=' text-[24px] w-[120px] rounded-[5px]' href="/register">Sign Up</a>
        <a  className='text-[24px]  w-[120px]  rounded-[5px]' href="/login">Sign In</a>
      </div>

    </div>

    : null}

     

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
      <button onClick={() => setmenuopened(true)} ><img width={30} src="Menu.png" alt="" /></button>
    </div>
   </div>
  )
}
