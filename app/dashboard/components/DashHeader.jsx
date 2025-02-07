'use client'
import useAuth from '@/app/hooks/useAuth'
import React, { useEffect } from 'react'

export default function DashHeader() {
   const {userinfo} = useAuth()
   console.log(userinfo)


   if(!userinfo.lastname){
    return null
   }



  return (
    <header className='flex items-center p-[20px] justify-between' >
    <div className="logo flex text-black items-center gap-[5px]">
      <img src="Logo.png" alt="" />
      <h3 className='text-[12px]' >Lets Complete Your Profile</h3>
    </div>
    <section  className='flex items-center gap-[25px]' >
    <a href="">How To Start</a>
    </section>

    <div className="profile relative">
    <div className="name"></div>
    <div className="profile flex items-center justify-center gap-[5px]">
     //<div className="s text-black flex items-center font-[500] gap-[3px]">{userinfo.firstname}, <div className="lastname">{userinfo.lastname[0]}</div></div>
        <img width={50} src="Profile.png" alt="" />
    </div>


  
    </div>

    </header>
  )
}
