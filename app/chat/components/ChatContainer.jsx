'use client'
import useAuth from '@/app/hooks/useAuth'
import useJwtauth from '@/app/hooks/useJwtauth'
import { useAuthStore } from '@/app/store/useAuthStore'
import { useMessagesStore } from '@/app/store/useMessagesStore'
import { File, Image, Languages, Search, Send, Upload } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default  function ChatContainer() {

  const sendmessageid = useSearchParams().get('sendmessage')
  const [message , setmessage] = useState()
    const {profile} = useAuth()
  const {checkauth , Authuser} = useAuthStore()
  const {userfromquery , userlistisloading,  queryuser ,queryisloading , userswhosentmessage, sendmessage , subscribemessages , getmessages, unsubscribemessages , allmessage , userslist} = useMessagesStore()




  useEffect(() => {
    subscribemessages()

    return () => unsubscribemessages()
  },[subscribemessages()])

  useEffect(() => {

    if(queryuser !== null){
      getmessages()
  
    }



  },[queryuser])

  useEffect(() => {
    if(Authuser == null || queryuser == null ) return;



      userslist(Authuser) 
  

   },[
    Authuser , queryuser 
  ])

  useEffect(() => {


 // Check Auth And Connect To Socket
    checkauth()

      userfromquery(sendmessageid)



    // If User Have Query For Message Get User Info

  






  },[sendmessageid])


  













  return (
    <div className="chatcontainer flex gap-[40px] items-start w-[100%] h-[79vh]">


      <div className="leftcontainer w-[350px] p-[20px]">
        <div className="search flex items-center justify-around gap-[5px]"><input className='searchinput' type="text" placeholder='Search People...' /> <Search></Search></div>
           

           
            {queryuser ?   <div className="users cursor-pointer bg-slate-900/50 rounded-[5px] mt-[35px]">
            <div className={`user flex items-center gap-[15px]   w-[350px] p-[10px] rounded-[15px]`}>
              <div  style={{backgroundImage:`url(${queryuser.profilepicture})`}}  className="chatprofiles w-[60px] rounded-[15px]  h-[60px] "></div>
              
              <div className="newline w-[200px] flex flex-col gap-[10px]">
              <div className="firstline"><div className="profilename flex w-[100%] items-center justify-between">{queryuser.firstname} {queryuser.lastname} <div className="sendtime text-[13px] text-gray-400">4m</div></div></div>
              <div className="secondline"><div className="lastmassage">Gaumarjos</div></div>
              </div>
     
            </div>
          </div> : null}

          {userswhosentmessage.map(data => (
            <Link href={`/chat?sendmessage=${data._id}`} key={data._id} className="users cursor-pointer bg-slate-900/50 rounded-[5px] mt-[35px]">
            <div className={`user flex items-center gap-[15px]   w-[350px] p-[10px] rounded-[15px]`}>
              <div  style={{backgroundImage:`url(${data.profilepicture})`}}  className="chatprofiles w-[60px] rounded-[15px]  h-[60px] "></div>
              
              <div className="newline w-[200px] flex flex-col gap-[10px]">
              <div className="firstline"><div className="profilename flex w-[100%] items-center justify-between">{data.firstname} {data.lastname} <div className="sendtime text-[13px] text-gray-400">4m</div></div></div>
              <div className="secondline"><div className="lastmassage">Gaumarjos</div></div>
              </div>
     
            </div>
          </Link> 
          ))}
          
          






      </div>

      <div className="chatmainpanel w-[100%] p-[20px]">
      messages
    
        <div className="topinfo">
       
 
          <div  className="usermainchat w-[100%]">

          <div className="profileheader text-[26px]"></div>
          <div className="mainchatframe flex flex-col gap-[20px] p-[10px] w-[95%] h-[77vh]">

            {allmessage.filter(filt => filt.sendby === queryuser._id || filt.sendto === queryuser._id).map((data , index) => {

              return data.sendto === queryuser._id ? 
              (
                <div key={index} className="messagebyme w-[100%] flex gap-[10px]   items-end justify-end">


                 <div className="messagemessenger p-[10px] flex  items-center rounded-[5px] bg-slate-900/50">{data.message}</div>


                 <div style={{backgroundImage:`url(${profile})`}} className="messengerprofilepic w-[45px] h-[45px] rounded-[5px] p-[20px]  bg-slate-900/80"></div>
         

                </div>
              )
              :   <div key={index} className="messagebyme w-[100%] flex gap-[10px]   items-end justify-start">


            


              <div style={{backgroundImage:`url(${queryuser.profilepicture})`}} className="messengerprofilepic w-[45px] h-[45px] rounded-[5px] p-[20px]  bg-slate-900/80"></div>
       
              <div className="messagemessenger p-[10px] flex  items-center rounded-[5px] bg-slate-900/50">{data.message}</div>

             </div>
            })}
          </div>
          <div className="messagebox pb-[10px] flex items-center gap-[10px] w-[100%]"><div className="image p-[10px] bg-slate-900/90"><Image className='' ></Image></div> <div className="inputarea  bg-slate-900/50 flex items-center justify-between p-[10px] w-[80%]"><input onChange={(e) => setmessage(e.target.value)} className='messagesendinput  w-[90%]' type="text" placeholder='Enter Your Message' /> <Languages></Languages></div><button><Send onClick={() => sendmessage({sendto:queryuser._id , sendby:Authuser.id , message:message})}></Send></button></div>

 

          </div>





        </div>


      </div>




      
    </div>
  )
}
