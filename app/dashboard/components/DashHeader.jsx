'use client'
import TranslatorComponent from '@/app/components/TranslatorComponent'
import useAuth from '@/app/hooks/useAuth'
import useJwtauth from '@/app/hooks/useJwtauth'
import { ArrowDownCircle, Delete, DeleteIcon, Edit, Link, Link2, Menu, MessageSquare, MessagesSquare, Recycle, RefreshCcw, RemoveFormatting, Settings, User, User2, User2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function DashHeader() {
   const {userinfo , user , profile , logout} = useAuth()
   const {decoded} = useJwtauth()
   const [serverloaded , setserverloaded] = useState(false)
   const [profileopened , setprofileopened] = useState(false)
   const [userurl , setuserurl] = useState()
   const [engopened , setengopened] = useState()









   

   useEffect(() => {
 

 
    if(!decoded.lastname){
      console.log(profile)
       setserverloaded(false)
     }else{
      setserverloaded(true)
     }
   },[])


   if(serverloaded == false){
    return null
   }



  return (
    <header className='flex items-center p-[20px] justify-between' >
      {profileopened ?
      <div className="profileopen ">
        {userurl}
        <div className="profileopenframe w-[100%]   flex items-center flex-col relative">

          <div onClick={() => setprofileopened(false)} className="exit flex items-center gap-[5px] text-black"><img width={30} src="Back.png" alt="" /> Back</div>
          <div className="profilemenupic flex items-center gap-[5px]"> <div className="profile flex items-center justify-center gap-[10px]">
     <div className="s text-black flex items-center font-[500] gap-[3px]">{decoded.firstname}, <div className="lastname">{decoded.lastname[0]}</div></div>
        <img  width={50} src={profile !== false ? profile : "Profile.png"} alt="" />
      
    </div></div>

          <div className="mainprofile w-[100%] flex items-center justify-between bg-white text-black h-[100vh] gap-[25px] flex-col">
          <div className="profiletittle mt-[100px]">Manage Your Profile</div>

          <div className="options h-[60vh] w-[100%]  flex flex-col gap-[5px]">
            <button className="option justify-center w-[100%] p-[10px] bg-gray-100 cursor-pointer flex items-center gap-[5px]">
            <Edit></Edit> Edit Your Privacy Information
            </button>



            <button className="option justify-center  w-[100%] p-[10px] bg-gray-100 cursor-pointer flex items-center gap-[5px]">
            <User></User> Edit Your Profile
            </button>

                 
            <button className="option justify-center w-[100%] p-[10px] bg-gray-100 cursor-pointer flex items-center gap-[5px]">
            <Settings></Settings> Translator Options
            </button>
                   
            <button className="option justify-center w-[100%] p-[10px] bg-gray-100 text-red-500 cursor-pointer flex items-center gap-[5px]">
            Delete Account
            </button>


          </div>

<div className="logout w-[100%]">
  <button onClick={() => logout()} className="logout p-[10px] w-[100%] bg-slate-100 text-red-500 flex items-center gap-[5px] justify-center">Logout <img width={20} src="Logout.png" alt="" /></button>
</div>
          </div>

         

        </div>
      </div>
      
      : null}
    <div className="logo  text-white flex text-black font-[500] items-center gap-[5px]">
    <div className="logoframe text-white p-[10px]">
        <MessagesSquare className='w-[35px] h-[35px] text-indigo-500'></MessagesSquare>
      </div>
      <h1 className='text-white' >Translator Ai</h1>
    </div>
    <section  className='flex items-center gap-[25px]' >
    </section>

    <div className="profile  relative flex items-center gap-[30px]">
    <div className="name"></div>
    <div className="language flex items-center justify-center relative flex-col gap-[10px]"><button onClick={() => engopened == true ? setengopened(false) : setengopened(true) } className="languagechooser flex items-center gap-[10px]">Eng <ArrowDownCircle className='size-[18px]'></ArrowDownCircle>
      </button> 
      <div style={engopened == true ? {display:'flex'} : {display:'none'}} className="div">


      </div>
 
      </div>
 
    <a href='/referal' className="referal text-white flex items-center cursor-pointer gap-[5px]"><Link className='size-[17px]'></Link> Referal System</a>
    <a href='/profile' className=" text-white flex items-center gap-[5px] cursor-pointer"><User2 className='size-[17px]'></User2> Profile</a>
    <a href='/chats' className=" text-white flex items-center gap-[5px] cursor-pointer"><MessageSquare className='size-[17px]'></MessageSquare> Chats</a>
    <div className="profile flex items-center justify-center gap-[10px]">
     <div onClick={() => setprofileopened(true)} className="s text-white flex cursor-pointer items-center font-[500] gap-[3px]">{decoded.firstname}, <div className="lastname">{decoded.lastname[0]}</div></div>
     
      {profile == false ? <div className="loaderprofileimage">
                        <div className="loaderline"></div>
                    </div> : 
                    <img className='ProfilePic cursor-pointer' onClick={() => setprofileopened(true)}  width={50} height={50} src={profile !== false ?  profile : null} alt="" />}
      
    </div>


  
    </div>
    <div className="menu"><Menu></Menu></div>

    </header>
  )
}
