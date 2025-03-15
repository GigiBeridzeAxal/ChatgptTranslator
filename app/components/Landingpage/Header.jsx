import React from 'react'
import './landing.css'

export default function Header() {
  return (
    
    <div className="landheader flex items-center justify-center p-[20px] w-[100%]">
        <div className="landheaderframe flex w-[70%] justify-between items-center">

            <div className="logo flex items-center ">
                <img width={80} src="Logo.png" alt="" />
                <h1>Translator App</h1>
            </div>

            <section className='text-black flex gap-[55px]'>
               <a className="howtouse">How To Use ?</a>
               <a className="howtouse">Translator Web </a>
            </section>

            <div className="ball absolute right-[-350px] w-[60%] h-[100vh] bg-gray-200/50 rounded-[50%]">
                
            </div>

        </div>
    </div>
 
  )
}
