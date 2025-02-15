'use client'
import useAuth from '@/app/hooks/useAuth'
import useJwtauth from '@/app/hooks/useJwtauth'
import React, { useEffect, useState } from 'react'


export default function Chatheader() {
    const {userinfo , profile , logout} = useAuth()
    const {decoded} = useJwtauth()
    const [profileopened , setprofileopened] = useState(false)
   const [serverloaded , setserverloaded] = useState(false)

   
   useEffect(() => {
    if(!decoded.lastname){
      console.log(profile)
       setserverloaded(false)
     }else{
      setserverloaded(true)
     }
   },[])


    if(!serverloaded){
      return null
    }

    
  return (
    <div className="chat p-[20px]">
         {profileopened ?
      <div className="profileopen ">
        <div className="profileopenframe w-[100%] flex items text-white -center flex-col relative">

          <div onClick={() => setprofileopened(false)} className="exit flex items-center gap-[5px]"><img width={30} src="Back.png" alt="" /> Back</div>
          <div className="profilemenupic flex items-center gap-[5px]"> <div className="profile flex items-center justify-center gap-[10px]">
     <div className="s text-white flex items-center font-[500] gap-[3px]">{decoded.firstname}, <div className="lastname">{decoded.lastname[0]}</div></div>
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
        <div className="chatframe">
            <div className="chattop flex items-center justify-between">Chat With People  
                <div className='flex items-center gap-[10px]'>

            <div className="s text-black flex items-center  font-[500] gap-[3px]">{decoded.firstname}, <div className="lastname">{decoded.lastname[0]}</div></div>
      {profile == false ? <div className="loaderprofileimage">
                        <div className="loaderline"></div>
                    </div> : 
                    <img className='ProfilePic' onClick={() => setprofileopened(true)} width={50} height={50} src={profile !== false ?  profile : null} alt="" />}
                </div> 
      
    </div>
        </div>
    </div>
  )
}
