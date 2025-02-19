'use client'
import useAuth from '@/app/hooks/useAuth'
import useJwtauth from '@/app/hooks/useJwtauth'
import { useAuthStore } from '@/app/store/useAuthStore'
import { useMessagesStore } from '@/app/store/useMessagesStore'
import axios from 'axios'
import { ArrowBigDown, ArrowDown, BoxSelect, File, Image, Languages, LucideArrowsUpFromLine, Search, SearchIcon, Send, Upload, Verified } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

 const Chat = () => {
  const [translatoropened  , settranslatoropened] = useState(false)

  const sendmessageid = useSearchParams().get('sendmessage')
  const [message , setmessage] = useState()
    const {profile} = useAuth()
  const {checkauth , Authuser , onlineusers} = useAuthStore()
  const {userfromquery , rerender, userlistisloading, isfiltering, filterpositions ,  queryuser ,queryisloading , userswhosentmessage, sendmessage , subscribemessages , getmessages, unsubscribemessages , allmessage , userslist} = useMessagesStore()

  const [countries , setcountries] = useState([])
  const [countriesropdown , setcountriesdropdown] = useState(false)
  const [selectedlanguage , setselectedlanguage] = useState('english')
  const [languagesearch , setlanguagesearch] = useState('')
  const [texttotranslate , settexttotranslate] = useState()
  const [translatedtext , settranslatedtext] = useState()
  

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
    <div className="chatcontainer flex gap-[40px] items-start w-[100%] h-[79vh]">


      <div className="leftcontainer w-[350px] p-[20px]">
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
              <div className="newline w-[200px] flex flex-col gap-[10px]">
              <div className="firstline"><div className="profilename flex w-[100%] items-center justify-between">{data.firstname} {data.lastname} <div className="sendtime text-[13px] text-gray-400">{minutes ? minutes < 1 ? "Just Now" : minutes + "m" : "Never"}</div></div></div>
              <div className="secondline"><div className="lastmassage flex items-center"><div className="msg">{ lastmessage ?   lastmessage.sendby == Authuser.id ? <div className="sendme">You: { lastmessage ? lastmessage.message.length > 14 ?  lastmessage.message.slice(0 , 14) + "..." : lastmessage.message : null }</div> :                
                <div className="sendme">{data.firstname}: { lastmessage.message.length > 14 ?  lastmessage.message.slice(0 , 14) + "..." : lastmessage.message}</div> : <div className="waitingyou text-gray-500 text-[13px]">He is Waiting You</div>
              
            

                
                }</div>                </div></div>
              </div>
     
            </div>
          </Link> 
 })}
          
          






      </div>

      <div className="chatmainpanel w-[100%] p-[20px]">
      messages
    
        <div className="topinfo">
       
 
          <div  className="usermainchat w-[100%]">

          <div className="profileheader text-[26px]"></div>
          <div className="mainchatframe flex flex-col gap-[20px] p-[10px] w-[95%] h-[77vh]">

          {queryuser ?  allmessage.filter(filt => filt.sendby === queryuser._id || filt.sendto === queryuser._id).map((data , index) => {

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
}) : null}


          </div>

          {countriesropdown ?
          <div className="countriesselector bg-gray-500/50 ">

            <div className="countriedropdown text-center text-black bg-white flex flex-col gap-[50px] p-[40px] w-[30%]">

             <h1>Select Language</h1>

             <div className="searcher flex items-center w-[100%] bg-slate-500/100 p-[10px]">

             <input  type="text" className='searchbg w-[95%]' onChange={(e) => setlanguagesearch(e.target.value)} placeholder='Search Language...' />
             <SearchIcon className='text-white' ></SearchIcon>

             </div>


             <div className="customlanguagesdropdown">

             {countries.filter(filt => filt.name.common.toUpperCase().includes(languagesearch.toUpperCase())).map((data, id) => {

            console.log(data)

               return <button onClick={() => setselectedlanguage(data.name.common) || setcountriesdropdown(false)} key={id} className='w-[100%] p-[20px] bg-gray-200 flex justify-between' ><div className="left flex items-center gap-[25px]"><img width={30} src={data.flags.png} alt="" />

               {data.name.common.slice(0,20)}
               
               </div>  <div className="isselected"> {selectedlanguage == 
               data.name.common ? <Verified></Verified> :<BoxSelect></BoxSelect>
                }  </div></button>

             })}

             </div>

            </div>


          </div>
          : null}
        
          <div className="messagebox relative pb-[10px] flex items-center gap-[10px] w-[100%]">
          {translatoropened ? <div className="translator">
            <div className="translatorheader p-[10px] flex items-center justify-between w-[100%]">
              <div className="left w-[50%]">
                <div className="autodetect text-gray-100 text-[18px]">Auto Detect</div>
              </div>
             
              <div className="right w-[50%] flex items-center justify-between"> 
                <button onClick={() => countriesropdown == true  ? setcountriesdropdown(false) : setcountriesdropdown(true)} className="selectlanguage flex items-center justfy-center gap-[5px]">
                  {selectedlanguage} <ArrowDown className='size-[18px]'></ArrowDown>
                </button>
                <div className="generate"><button onClick={() => translate()} className='p-[10px] bg-blue-500 text-white'>Translate [3c]</button></div>
                  </div>
            </div>

            <div className="translatormainframe flex items-center">
              <div className="lefttranslator w-[50%] h-[250px]">
              <textarea onChange={(e) => settexttotranslate(e.target.value)} name="" placeholder='Enter Text To Translate' className='w-[100%] p-[10px] bg-slate-800  h-[250px]' id=""></textarea>
              </div>
              <div className={  `right w-[50%] ${translatedtext !== undefined ? '' : "text-gray-400 "} bg-slate-800 p-[10px] h-[250px]`}>

              {translatedtext !== undefined ? translatedtext : "Click Translate To See Result"}
              </div>
            </div>
          </div> : null}
            <div className="image p-[10px] bg-slate-900/90"><Image className='' ></Image></div> <div className="inputarea  bg-slate-900/50 flex items-center justify-between p-[10px] w-[80%]"><input onChange={(e) => setmessage(e.target.value)} className='messagesendinput  w-[90%]' type="text" placeholder='Enter Your Message' /> <Languages onClick={() =>   translatoropened ?settranslatoropened(false) : settranslatoropened(true)} ></Languages></div><button><Send onClick={() => sendmessage({sendto:queryuser._id , sendby:Authuser.id , message:message})}></Send></button></div>

 

          </div>





        </div>


      </div>




      
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
