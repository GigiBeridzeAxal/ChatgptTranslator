import React from 'react'

export default function Header() {
  return (
   <header className='flex items-center p-[20px] justify-between' >
    <div className="logo flex items-center gap-[25px]">
      <img src="Logo.png" alt="" />
      <h1>Translator Ai</h1>
    </div>
    <section  className='flex items-center gap-[25px]' >
    <a href="">How To Start</a>
    </section>

    <div className="headerbuttons flex items-center gap-[10px]">
      <div className="language flex items-center justify-center gap-[5px]">Eng <img src="Expand.png" alt="" /></div>
      <button className='p-[7px]' >Sign Up</button>
      <button className='p-[7px] bg-teal-500 text-white rounded-[3px]'>Get Started</button>
    </div>
    <div className="Menu hidden">
      <button><img width={30} src="Menu.png" alt="" /></button>
    </div>
   </header>
  )
}
