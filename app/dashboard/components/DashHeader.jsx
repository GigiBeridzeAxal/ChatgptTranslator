'use client'
import TranslatorComponent from '@/app/components/TranslatorComponent'
import useAuth from '@/app/hooks/useAuth'
import useJwtauth from '@/app/hooks/useJwtauth'
import { useAuthStore } from '@/app/store/useAuthStore'
import { ArrowDownCircle, BugPlayIcon, Coins, CreditCard, Delete, DeleteIcon, Edit, Link, Link2, Menu, MessageSquare, MessagesSquare, Recycle, RefreshCcw, RemoveFormatting, Settings, User, User2, User2Icon, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function DashHeader() {
   const {userinfo , user , profile} = useAuth()
   const {logout , Authuser , userplan , checkauth , userdata , getuserdata} = useAuthStore()
   const {decoded} = useJwtauth()
   const [serverloaded , setserverloaded] = useState(false)
   const [profileopened , setprofileopened] = useState(false)
   const [userurl , setuserurl] = useState()
   const [engopened , setengopened] = useState()
   const [menuopened , setmenuopened] = useState(false)



   useEffect(() => {

    if(Authuser == null) return ;
    getuserdata()




   },[Authuser])


   

   useEffect(() => {

    checkauth()
 

 
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

          <div onClick={() => setprofileopened(false)} className="exit flex items-center gap-[5px] text-black"><img width={30} src="Back.png" alt="" /> 뒤쪽에</div>
          <div className="profilemenupic flex items-center gap-[5px]"> <div className="profile flex items-center justify-center gap-[10px]">
     <div className="s text-black flex items-center font-[500] gap-[3px]">{decoded.firstname}, <div className="lastname">{decoded.lastname[0]}</div></div>
        <img  width={50} src={profile !== false ? profile : "Profile.png"} alt="" />
      
    </div></div>

          <div className="mainprofile w-[100%] flex items-center justify-between bg-white text-black h-[100vh] gap-[25px] flex-col">
          <div className="profiletittle mt-[100px]">프로필 관리</div>

          <div className="options h-[60vh] w-[100%]  flex flex-col gap-[5px]">
            <button className="option justify-center w-[100%] p-[10px] bg-gray-100 cursor-pointer flex items-center gap-[5px]">
            <Edit></Edit> 개인정보 정보 수정
            </button>



            <button className="option justify-center  w-[100%] p-[10px] bg-gray-100 cursor-pointer flex items-center gap-[5px]">
            <User></User> 프로필 편집
            </button>

                 
            <button className="option justify-center w-[100%] p-[10px] bg-gray-100 cursor-pointer flex items-center gap-[5px]">
            <Settings></Settings> 번역기 옵션
            </button>
                   
            <button className="option justify-center w-[100%] p-[10px] bg-gray-100 text-red-500 cursor-pointer flex items-center gap-[5px]">
            계정 삭제
            </button>


          </div>

<div className="logout w-[100%]">
  <button onClick={() => logout()} className="logout p-[10px] w-[100%] bg-slate-100 text-red-500 flex items-center gap-[5px] justify-center">로그아웃 <img width={20} src="Logout.png" alt="" /></button>
</div>
          </div>

         

        </div>
      </div>
      
      : null}
    <div className="logo  text-white flex text-black font-[500] items-center gap-[5px]">
    <div className="logoframe text-white p-[10px]">
        <MessagesSquare className='w-[35px] h-[35px] text-indigo-500'></MessagesSquare>
      </div>
      <h1 className='text-white' >번역자 당신</h1>
    </div>
    <section  className='flex items-center gap-[25px]' >
    </section>

    <div className="profile  relative flex items-center gap-[30px]">
    <div className="name"></div>
    <a href='/Plans' className="referal text-white flex items-center cursor-pointer gap-[5px]"><BugPlayIcon className='size-[17px]'></BugPlayIcon> 계획</a>
    <div className="language flex items-center justify-center relative flex-col gap-[10px]"><button onClick={() => engopened == true ? setengopened(false) : setengopened(true) } className="languagechooser flex items-center gap-[10px]">영어 <ArrowDownCircle className='size-[18px]'></ArrowDownCircle>

      </button> 

      <div style={engopened == true ? {display:'flex'} : {display:'none'}} className="div">


      </div>
 
      </div>
 
    <a href='/referal' className="referal text-white flex items-center cursor-pointer gap-[5px]"><Link className='size-[17px]'></Link> 추천 시스템</a>
    <a href='/profile' className=" text-white flex items-center gap-[5px] cursor-pointer"><User2 className='size-[17px]'></User2> 윤곽</a>
    <a href='/chat' className=" text-white flex items-center gap-[5px] cursor-pointer"><MessageSquare className='size-[17px]'></MessageSquare> 채팅</a>
    <div className="profile flex items-center justify-center gap-[10px]">
    <div className="userminiinfo flex flex-col ">
      <div onClick={() => setprofileopened(true)} className="headerprofilename text-white flex cursor-pointer items-center font-[500] gap-[3px]">{decoded.firstname}, <div className="lastname">{decoded.lastname[0]}</div></div>
      
      <div className={`plan text-[16px]  ${  userplan == "Free" ? '' : "planpremium" } `}>{ userplan}</div>
      </div>
   
     
      {profile == false ? <div className="loaderprofileimage">
                        <div className="loaderline"></div>
                    </div> : 
                    <img className='ProfilePic cursor-pointer' onClick={() => setprofileopened(true)}  width={50} height={50} src={profile !== false ?  profile : null} alt="" />}
      
    </div>


  
    </div>
    {menuopened?
    <div className="menuframe p-[20px]">

      <div className='flex w-[100%] text-white items-center justify-between '><div className="menuttittle flex items-center justify-center gap-[5px]"> 
      {profile == false ? <div className="loaderprofileimage">
                        <div className="loaderline"></div>
                    </div> : 
                    <img className='ProfilePic cursor-pointer' onClick={() => setprofileopened(true)}  width={50} height={50} src={profile !== false ?  profile : null} alt="" />}
      <div className="userminiinfo flex flex-col ">
      <div onClick={() => setprofileopened(true)} className="headerprofilename text-white flex cursor-pointer items-center font-[500] gap-[3px]">{decoded.firstname}, <div className="lastname">{decoded.lastname[0]}</div></div>
      
      <div className={`plan text-[16px]  ${userplan == "Free" ? '' : "planpremium"} `}>{userplan}</div>
      </div>
   
     

        
        </div> <div className=""><X onClick={() => setmenuopened(false)}></X></div></div>
        <br /><br />

        <div className="sections flex flex-col gap-[25px]">
        <a className='flex items-center justify-center gap-[5px] w-[100%] ' href="/chat"><MessageSquare className=' size-[18px]'></MessageSquare> 채팅</a>

        <a className='flex items-center justify-center gap-[5px] w-[100%] ' href="/Plans"><BugPlayIcon className=' size-[18px]'></BugPlayIcon> 계획</a>
 
        <a className='flex items-center justify-center gap-[5px] w-[100%] ' href=""><Link className=' size-[18px]'></Link> 추천 시스템</a>
 
        <a className='flex items-center justify-center gap-[5px] w-[100%] text-[24px]' href=""> {userdata.credits} <Coins className='text-yellow-500'></Coins></a>

 

        </div>


    </div>
    : null}
    <div className="menu flex items-center justify-center gap-[20px]">
      
      <Menu onClick={() => menuopened == true ?  setmenuopened(false) : setmenuopened(true)}></Menu>  

   
      
    </div>

    </header>
  )
}
