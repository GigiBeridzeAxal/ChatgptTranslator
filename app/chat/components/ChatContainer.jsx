'use client'
import useAuth from '@/app/hooks/useAuth'
import useJwtauth from '@/app/hooks/useJwtauth'
import { useAuthStore } from '@/app/store/useAuthStore'
import { useMessagesStore } from '@/app/store/useMessagesStore'
import axios from 'axios'
import { ArrowBigDown, ArrowDown, ArrowLeft, ArrowLeftCircle, ArrowLeftFromLine, ArrowLeftSquare, BoxSelect, Coins, Construction, File, Image, Languages, LucideArrowsUpFromLine, Mic, Mic2, MicVocal, Play, Search, SearchIcon, Send, SendIcon, Speaker, Stars, Upload, Verified, Voicemail } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import './VoiceTranslator.css'
import toast from 'react-hot-toast'


 const Chat = () => {
  const [translatoropened  , settranslatoropened] = useState(false)
  const msgref = useRef(0)

  const sendmessageid = useSearchParams().get('sendmessage')
  const [message , setmessage] = useState()
    const {profile} = useAuth()
  const {checkauth , buyitem, getuserdata , userplan , userdata, Authuser , onlineusers} = useAuthStore()
  const {userfromquery , rerender, userlistisloading, isfiltering, filterpositions ,  queryuser ,queryisloading , userswhosentmessage, sendmessage , subscribemessages , getmessages, unsubscribemessages , allmessage , userslist} = useMessagesStore()

  const [countries , setcountries] = useState([])
  const [countriesropdown , setcountriesdropdown] = useState(false)
  const [selectedlanguage , setselectedlanguage] = useState('taiwan')
  const [languagesearch , setlanguagesearch] = useState('')
  const [texttotranslate , settexttotranslate] = useState()
  const [voicetranslator , setvoicetranslator] = useState(false)
  const [voicetospeech , setvoicetospech] = useState()
  const [voiceisstarted , setvoiceisstarted] = useState(false)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([]);
  const audioContext = new (window.AudioContext)();
const analyser = audioContext.createAnalyser();
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);


  const [audiovoice , setaudiovoice] = useState(null)

  
  const [translatedtext , settranslatedtext] = useState('')
 
   const {decoded} = useJwtauth()
   useEffect(() => {
    if (msgref.current) {
      msgref.current.scrollTo({
        top: msgref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [allmessage]);


  useEffect(() => {
    if (msgref.current) {
      msgref.current.scrollTo({
        top: msgref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [msgref]);

  const audiotranslate = async() => {
    const formData = new FormData();
    formData.append("file", audiovoice);
    console.log(formData.get('file'))

    const gettranslatedversion = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'translateauido' , formData , {     headers: {
      'Content-Type': 'multipart/form-data',
    },})

    console.log(gettranslatedversion.data)
    
  }


  const startvoice = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = []; 

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
          console.log(audioBlob)
          setaudiovoice(URL.createObjectURL(audioBlob));
        }
      };

      mediaRecorderRef.current.start();
      setvoiceisstarted(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopvoice = () => {

    console.log("Stop");
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setvoiceisstarted(false);
    } else {
      console.error("MediaRecorder is not active.");
    }
  };

 

   const changemsgscroll = () => {
    if (msgref.current) {
      msgref.current.scrollTo({
        top: msgref.current.scrollHeight,
        behavior: "smooth",
      });
    }
   }

  const translate = async() => {


    console.log(userdata.credits)



    if(userdata.credits >= 3){
      
      const item = 'Translate'
      const email = userdata.email
      buyitem(email , item)
      const translatetext = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'TranslateText' , {
        texttotranslate:texttotranslate,
        language:selectedlanguage
      })
  
      settranslatedtext(translatetext.data)
  
  
    }else{
      toast.error("You Dont Have Enough Credits")
    }


    


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
      getuserdata()
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

          <img className='rounded-[50%] orangcirc w-[60px] h-[60px]' src={profile ? profile : null} width={60} alt="" />

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




           

 
     
   
            
           return <Link href={`/chat?sendmessage=${data._id}`} key={data._id} className={`users trace relative cursor-pointer ${queryuser ? queryuser._id === data._id ? "bg-slate-700/50" : "bg-slate-900/50" : "bg-slate-900/50"}  rounded-[5px] mt-[35px] `}>
            <div className={`user flex items-center gap-[15px]   w-[350px] p-[10px] rounded-[15px]`}>
              <div  style={{backgroundImage:`url(${data.profilepicture})`}}  className="chatprofiles w-[60px] rounded-[15px]  h-[60px] "></div>
              {onlineusers.includes(data._id) ?<div className="usersbyonlineforchat  bg-teal-500"></div> :<div className="usersbyonlineforchat bg-gray-500"></div> }
              <div className="flex usersforchatdesc items-start w-[200px] flex flex-col gap-[10px]">
              <div className="w-[100%]"><div className=" flex w-[100%] items-center justify-between">{data.firstname} {data.lastname} <div className="sendtime text-[13px] text-gray-400">{minutes ? minutes < 1 ? "Just Now" : minutes + "m" : "Never"}</div></div></div>
              <div className="secondline"><div className="lastmassage flex items-center"><div className="msg ">{ lastmessage ?   lastmessage.sendby == Authuser.id ? <div className="sendme">You: { lastmessage ? lastmessage.message.length > 14 ?  lastmessage.message.slice(0 , 14) + "..." : lastmessage.message : null }</div> :                
                <div className="sendme">{data.firstname}: { lastmessage.message.length > 14 ?  lastmessage.message.slice(0 , 14) + "..." : lastmessage.message}</div> : <div className="waitingyou text-gray-500 text-[13px]">He is Waiting You</div>
              
            

                
                }</div>                </div></div>
              </div>
     
            </div>
          </Link> 
 })}
          
          






      </div>

      {queryuser ?
    
      
      <div className="chatmainpanel pb-[10px] justify-between items-center flex flex-col  bg-slate-900/50 w-[100%] ">


      <div className=' w-[100%] '>
        {
        queryuser ?

        <div className="mainchattopheader w-[100%] p-[10px] bg-white">

<div className='flex items-center text-black gap-[10px]'>
                  <Link href='/chat' className="back"> <ArrowLeft></ArrowLeft> Back</Link>
                  <br />
<img className='rounded-[50%] w-[60px] h-[60px]' src={queryuser.profilepicture} width={60} alt="" />
<div className="chatuserinfo flex flex-col justify-start">
  <h1>{queryuser.firstname} , {queryuser.lastname[0].toUpperCase()}</h1>
  <hr />
</div>

        </div>
        
        </div>

       
        : null}
         <div ref={msgref} className={`msg h-[75vh] w-[100%] ${translatoropened || voicetranslator ? "reducedsize" : ''} mt-[25px]`} >


{queryuser ?  allmessage.filter(filt => filt.sendby === queryuser._id || filt.sendto === queryuser._id).map((data , index) => {

return data.sendto === queryuser._id ? 
(

<div key={index} className="w-[95%] flex items-end m-[15px] justify-end gap-[5px]"> 

<div className="messagebyusers bg-slate-950/50 p-[10px]">{data.message}</div>

<img width={40} height={40} className='rounded-[50%] w-[40px] h-[40px]' src={profile} alt="" />

</div>
)
:   <div  key={index} className="w-[100%] flex m-[15px] items-end justify-start gap-[5px]"> 
<img width={40} className='rounded-[50%] w-[40px] h-[40px]' src={queryuser.profilepicture} alt="" />

<div className="messagebyusers bg-slate-950/50 p-[10px]">{data.message}</div>


</div>
}) : null}

</div>
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
     

      {translatoropened ?
      <div className="translator p-[10px] flex items-center flex-col justify-center bg-gray-800">

        <div className="w-[100%] flex items-center justify-center">
          <div className="leftranslatortop w-[50%]"><div className=" p-[10px] sizer flex justify-center  items-center bg-slate-950/50 w-[200px] gap-[10px] rounded-[5px]"><Stars className='text-indigo-300' ></Stars> Auto Detect</div></div>
          <div className="righttranslatortop flex justify-end w-[50%]">
          <button onClick={() => setcountriesdropdown(true)} className=" p-[10px] flex justify-center sizer  items-center bg-slate-950/50 w-[200px] gap-[10px] rounded-[5px] nobreak"><img  width={30} src={'awd'} alt="" /> {selectedlanguage.slice(0,8)}  <ArrowDown className='size-[17px]'></ArrowDown></button>

          

          </div>
        </div>

        <div className="maintranslator flex items-start justify-center w-[100%]">
          
        <div className="translatorinput p-[10px] w-[50%] h-[250px] ">
          <textarea onChange={(e) => settexttotranslate(e.target.value)} className='w-[100%]  p-[10px]  h-[230px] bg-slate-900/50'  name="" placeholder='Enter Text To Translate...' id=""></textarea>

</div>
<div className="translatoranswer w-[50%] p-[10px] h-[250px]">

<textarea className='w-[100%]  p-[10px] p-[10px] h-[230px] bg-slate-900/50' value={translatedtext} readOnly name="" placeholder='Click Generate To Genreate Text' id=""></textarea>
</div>


        </div>

          <div className='flex items-center justify-center gap-[25px]'>

          <button onClick={() => translate()} className="generate flex items-center justify-center p-[8px] rounded-[5px] gap-[10px] bg-purple-500"><Play></Play> Generate</button>
          <div className="creditvalue flex items-center justify-center gap-[5px]">{userdata.credits} <Coins className='text-yellow-400'></Coins></div>

          </div>

      </div>

      : null}

      {voicetranslator ? 
      <div className="voicetranslator fixed left-[0px] top-[0px] zindex-[25] flex flex-col p-[10px] flex items-center gap-[50px]  bg-black h-[100vh] w-[100%] ">
        <br />
        <br />
  
        <h1 className='text-[36px] flex items-center justify-center gap-[30px]' ><button onClick={() => setvoicetranslator(false)} className="back"><ArrowLeftSquare className='size-[34px]'></ArrowLeftSquare></button> Voice Translator</h1>
    

        <div className='flex items-center justify-center gap-[100px]'>
        <button className='flex items-center justify-center gap-[5px] bg-gray-900/50 p-[10px] rounded-[5px]' ><Stars className='text-purple-600'></Stars> Auto Detect</button>
        <button className='flex items-center justify-center gap-[5px] bg-gray-900/50 p-[10px] rounded-[5px]' ><Construction className='rounded-[50%]'></Construction> English</button>
        </div>
        <button onClick={() => audiotranslate()} className="generate flex items-center justify-center p-[8px] rounded-[5px] gap-[10px] bg-purple-500"><Play></Play> Generate</button>
       
       
   

        {audiovoice ? 
        
        <div className=" flex items-center justify-center gap-[10px] flex-col">Original: <audio src={audiovoice} controls></audio></div> 
        :      <div className="anims text-[40px] text-center text-gray-700 w-[320px]">
        <span className='text-white'>Hello !</span> Please Record Audio To Translate
      </div>}


        <div className="micbtns">
          <div className="shadows">
            <div className="shadow"></div>
          </div>
          <Mic onClick={() => voiceisstarted ? stopvoice() : startvoice() } className={`size-[120px] p-[30px] ${voiceisstarted ? "shadowformic" : ''}  rounded-[50%] bg-blue-500` }></Mic>
        </div>

   
      
      </div>
      
      : null}


<br />
      <div className='flex w-[100%] fixedbtn items-center justify-center gap-[15px]'>

          <div className="sendmsg flex w-[90%] items-center  justify-center gap-[5px] bg-slate-900/50"> <button onClick={() => !voicetranslator ?  setvoicetranslator(true) : setvoicetranslator(false) } className="voice p-[10px] bg-slate-900/50"><Mic></Mic></button> <input onChange={(e) => setmessage(e.target.value)} className='w-[100%] p-[10px]' type="text" style={{background:'none' , outline:0 , border:0}} placeholder='Type Message Here...' /> <Languages onClick={() => translatoropened ? settranslatoropened(false) :  settranslatoropened(true) || changemsgscroll() }></Languages> </div ><SendIcon onClick={() => sendmessage({sendto:queryuser._id , sendby:Authuser.id , message:message})} ></SendIcon>
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
