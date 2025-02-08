'use client'
import useAuth from '@/app/hooks/useAuth'
import React, { useEffect, useState } from 'react'

export default function DashHeader() {
   const {userinfo , user , profile , logout} = useAuth()

   const [profileopened , setprofileopened] = useState(false)

   


   if(!userinfo.lastname){
    return null
   }



  return (
    <header className='flex items-center p-[20px] justify-between' >
      {profileopened ?
      <div className="profileopen ">
        <div className="profileopenframe w-[100%] flex items -center flex-col relative">

          <div onClick={() => setprofileopened(false)} className="exit flex items-center gap-[5px]"><img width={30} src="Back.png" alt="" /> Back</div>
          <div className="profilemenupic flex items-center gap-[5px]"> <div className="profile flex items-center justify-center gap-[10px]">
     <div className="s text-black flex items-center font-[500] gap-[3px]">{userinfo.firstname}, <div className="lastname">{userinfo.lastname[0]}</div></div>
        <img  width={50} src={profile !== false ? profile : "Profile.png"} alt="" />
      
    </div></div>

          <div className="mainprofile w-[100%] flex items-center justify-between h-[100vh] gap-[25px] flex-col">
          <div className="profiletittle mt-[100px]">Manage Your Profile</div>

          <div className="options"></div>

<div className="logout w-[100%]">
  <button onClick={() => logout()} className="logout p-[10px] w-[100%] bg-slate-100 text-red-500 flex items-center gap-[5px] justify-center">Logout <img width={20} src="Logout.png" alt="" /></button>
</div>
          </div>

         

        </div>
      </div>
      : null}
    <div className="logo flex text-black items-center gap-[5px]">
      <img src="Logo.png" alt="" />
      <h3 className='text-[12px]' ></h3>
    </div>
    <section  className='flex items-center gap-[25px]' >
    <a href="">How To Start</a>
    </section>

    <div className="profile relative">
    <div className="name"></div>
    <div className="profile flex items-center justify-center gap-[10px]">
     <div className="s text-black flex items-center font-[500] gap-[3px]">{userinfo.firstname}, <div className="lastname">{userinfo.lastname[0]}</div></div>
        <img className='ProfilePic' onClick={() => setprofileopened(true)} width={50} height={50} src={profile !== false ? profile : "Profile.png"} alt="" />
      
    </div>


  
    </div>

    </header>
  )
}
