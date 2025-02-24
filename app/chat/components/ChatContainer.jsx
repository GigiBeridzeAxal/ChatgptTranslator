'use client'
import useAuth from '@/app/hooks/useAuth'
import useJwtauth from '@/app/hooks/useJwtauth'
import { useAuthStore } from '@/app/store/useAuthStore'
import { useMessagesStore } from '@/app/store/useMessagesStore'
import axios from 'axios'
import { ArrowBigDown, ArrowDown, ArrowLeft, BoxSelect, File, Image, Languages, LucideArrowsUpFromLine, Search, SearchIcon, Send, SendIcon, Upload, Verified } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

 const Chat = () => {
  const [translatoropened  , settranslatoropened] = useState(false)

  const sendmessageid = useSearchParams().get('sendmessage')
  const [message , setmessage] = useState()
    const {profile} = useAuth()
  const {checkauth , userplan , Authuser , onlineusers} = useAuthStore()
  const {userfromquery , rerender, userlistisloading, isfiltering, filterpositions ,  queryuser ,queryisloading , userswhosentmessage, sendmessage , subscribemessages , getmessages, unsubscribemessages , allmessage , userslist} = useMessagesStore()

  const [countries , setcountries] = useState([])
  const [countriesropdown , setcountriesdropdown] = useState(false)
  const [selectedlanguage , setselectedlanguage] = useState('english')
  const [languagesearch , setlanguagesearch] = useState('')
  const [texttotranslate , settexttotranslate] = useState()
  
  const [translatedtext , settranslatedtext] = useState()
 
   const {decoded} = useJwtauth()
  const translate = async() => {



    const translatetext = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'TranslateText' , {
      texttotranslate:texttotranslate,
      language:selectedlanguage
    })

    settranslatedtext(translatetext.data)



  }


  

  useEffect(() => {
    if(Authuser !== null){
      userslist(Authuser , sendmessageid) 
      console.log("rerendered")
    }

    


  },[rerender])
  useEffect(() => {
    subscribemessages()

    return () => unsubscribemessages()
  },[subscribemessages()])



  useEffect(() => {

    if(userswhosentmessage[0] == undefined || sendmessageid == undefined) return;
    console.log("Work")
    userfromquery(sendmessageid)

    
  },[userswhosentmessage])


  useEffect(() => {
    
    if(userswhosentmessage[0] == undefined || allmessage[0] == undefined  || isfiltering == false) return;
    filterpositions()


  },[userswhosentmessage , allmessage , queryuser])




  useEffect(() => {

    if(Authuser !== null){
      getmessages(Authuser)
      userslist(Authuser , sendmessageid) 
    }



  },[Authuser])

 
  useEffect(() => {


 // Check Auth And Connect To Socket
    checkauth()

      userfromquery(sendmessageid)



   console.log(queryuser)  






  },[sendmessageid])

  useEffect(() => {

    const getc = async () => {

      const getcountries = await axios.get('https://restcountries.com/v3.1/all')
      setcountries(getcountries.data)
      console.log(getcountries.data)

  }
  getc()

  },[])

  













  return (
    <div className="chatcontainer flex gap-[40px] items-start w-[100%] ">


      <div className="leftcontainer bg-slate-900/50 w-[350px] p-[20px]">
      <div className='flex gap-[10px]' >

        {Authuser !== null ? <div className='flex items-center gap-[10px]' >

          <img className='rounded-[50%]' src={profile ? profile : null} width={60} alt="" />

          <div className="chatleftheaderdesc flex flex-col justify-between">

            <h1>{Authuser.firstname} , {Authuser.lastname[0].toUpperCase()}</h1>
            <hr />
            <h1>{userplan}</h1>

          </div>



        </div>: null}
     
      </div>
      <br />
    
   
        <div className="search flex items-center justify-around gap-[5px]"><input className='searchinput' type="text" placeholder='Search People...' /> <Search></Search></div>
           

           
          
          {userswhosentmessage.map((data) => {

           
           const allmesageforuser = allmessage.filter(filt => filt.sendby === data._id || filt.sendto == data._id)

           let lastmessage = allmesageforuser.at(-1) == undefined ? undefined : allmesageforuser.at(-1)
  
 
            let sendtime = lastmessage !== undefined ? lastmessage.sendtime : null
            const date = sendtime !== null ?  new Date() - new Date(sendtime) : null

    
            let minutes = date !== null ?  Math.floor(date / 60000) : null




           

 
     
   
            
           return <Link href={`/chat?sendmessage=${data._id}`} key={data._id} className={`users relative cursor-pointer ${queryuser ? queryuser._id === data._id ? "bg-slate-700/50" : "bg-slate-900/50" : "bg-slate-900/50"}  rounded-[5px] mt-[35px] `}>
            <div className={`user flex items-center gap-[15px]   w-[350px] p-[10px] rounded-[15px]`}>
              <div  style={{backgroundImage:`url(${data.profilepicture})`}}  className="chatprofiles w-[60px] rounded-[15px]  h-[60px] "></div>
              {onlineusers.includes(data._id) ?<div className="usersbyonlineforchat  bg-teal-500"></div> :<div className="usersbyonlineforchat bg-gray-500"></div> }
              <div className="flex usersforchatdesc items-start w-[200px] flex flex-col gap-[10px]">
              <div className="w-[100%]"><div className=" flex w-[100%] items-center justify-between">{data.firstname} {data.lastname} <div className="sendtime text-[13px] text-gray-400">{minutes ? minutes < 1 ? "Just Now" : minutes + "m" : "Never"}</div></div></div>
              <div className="secondline"><div className="lastmassage flex items-center"><div className="msg">{ lastmessage ?   lastmessage.sendby == Authuser.id ? <div className="sendme">You: { lastmessage ? lastmessage.message.length > 14 ?  lastmessage.message.slice(0 , 14) + "..." : lastmessage.message : null }</div> :                
                <div className="sendme">{data.firstname}: { lastmessage.message.length > 14 ?  lastmessage.message.slice(0 , 14) + "..." : lastmessage.message}</div> : <div className="waitingyou text-gray-500 text-[13px]">He is Waiting You</div>
              
            

                
                }</div>                </div></div>
              </div>
     
            </div>
          </Link> 
 })}
          
          






      </div>

      {queryuser ?
      
      <div className="chatmainpanel items-center flex flex-col  bg-slate-900/50 w-[100%] ">


      <div className='p-[10px] w-[100%] bg-white mainchattopheader'>
        {
        queryuser ?

        <div className='flex items-center text-black gap-[10px]'>
                  <Link href='/chat' className="back"> <ArrowLeft></ArrowLeft> Back</Link>
                  <br />
<img className='rounded-[50%]' src={queryuser.profilepicture} width={60} alt="" />
<div className="chatuserinfo flex flex-col justify-start">
  <h1>{queryuser.firstname} , {queryuser.lastname[0].toUpperCase()}</h1>
  <hr />
</div>
        </div>
        : null}
      </div>

      <div className='msg w-[100%] mt-[25px]' >


      {queryuser ?  allmessage.filter(filt => filt.sendby === queryuser._id || filt.sendto === queryuser._id).map((data , index) => {

return data.sendto === queryuser._id ? 
(
 
  <div key={index} className="w-[95%] flex items-end m-[15px] justify-end gap-[5px]"> 

  <div className="messagebyusers bg-slate-950/50 p-[10px]">{data.message}</div>
  
  <img width={40} className='rounded-[50%]' src={profile} alt="" />

  </div>
)
:   <div  key={index} className="w-[100%] flex m-[15px] items-end justify-start gap-[5px]"> 
<img width={40} className='rounded-[50%]' src={profile} alt="" />

<div className="messagebyusers bg-slate-950/50 p-[10px]">{data.message}</div>


</div>
}) : null}

      </div>


      <div className='flex w-[90%] items-center justify-center gap-[15px]'>

        <button className="sendmsg flex w-[90%] items-center  justify-center gap-[5px] bg-slate-900/50"><input onChange={(e) => setmessage(e.target.value)} className='w-[100%] p-[10px]' type="text" style={{background:'none' , outline:0 , border:0}} placeholder='Type Message Here...' /> <Languages></Languages> </button ><SendIcon onClick={() => sendmessage({sendto:queryuser._id , sendby:Authuser.id , message:message})} ></SendIcon>
      </div>

      </div>
 : null}







      
    </div>
  )
}

export default function ChatContainer() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Chat></Chat>
    </Suspense>
  )
}
