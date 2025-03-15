'use client'
import React, { Suspense, useEffect, useState } from 'react'
import DashHeader from '../dashboard/components/DashHeader';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Edit } from 'lucide-react';
import Link from 'next/link';

export default function page() {

    const searchparams = useSearchParams()
    const [targetuser , settargetuser] = useState()
      const [countries , setcountries] = useState([])

    const id = searchparams.get('id')

    useEffect(() => {
      if(!id) {return;}

         const gettargetuser = async() => {


            const get = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "getprofilebyid" ,  {id:id})

            if(get){
                settargetuser(get.data[0])
            }

         }
         gettargetuser()

    }, [])


      useEffect(() => {
    
            const getc = async () => {
        
              const getcountries = await axios.get('https://restcountries.com/v3.1/all')
              setcountries(getcountries.data)
              console.log(getcountries.data)
              
        
          }
          getc()
        
          },[])

    if(!targetuser){return ;}


    const Profile = () => {
      return  <div >
      <DashHeader></DashHeader>
      <div className=" w-[100%] pt-[200px] flex items-center justify-center">
  
  
  
           <div className="userprofileeditor flex flex-col gap-[104px] w-[90%] sm:w-[70%]">
  
              {/* Profile */}
  
        
  
              <div className='w-[100%]  flex-wrap gap-[35px] flex items-center sm:justify-between justify-center'>
                  <div className="editimage flex items-end">
                  <img  className='w-[200px] rounded-[50%] h-[200px]' src={targetuser.profilepicture} alt="" />
  
                  </div>
  
                  <Link href={`/chat?sendmessage=${targetuser._id}`} className="sendmsg p-[20px] text-white bg-blue-500 rounded-[3px]"><button>Send Message {targetuser.firstname}</button></Link>
  
  
              </div>
  
              
  
  
                   {/* Desc */}
  
                   <div className='flex flex-col gap-[15px]'>
  
                   <div className="wanttotalk flex items-center gap-[10px]">About Me:         </div>
  
  <div className="wantotalkbox textwrapped  border-2 p-[10px] ">
      {targetuser.aboutme}
  </div>
  <br /><br />
              <div className='flex flex-col gap-[15px]'>
              <div className="wanttotalk flex items-center gap-[10px]">Want To Talk:       </div>
  
  <div className="wantotalkbox textwrapped border-2 p-[10px] ">
  {targetuser.liketotalk}
  </div>
              </div>
        
  
                   </div>
  
                
  
  
                   
                   {/* Languages */}
  
                   <div className='flex flex-col gap-[55px]'>
                      
                          {/* can Teach */}
                      <div className="wanttotalk flex items-center gap-[10px] flex-wrap">Can Teach You: {countries.map((data, id) => 
                      {
  
                          const allcanspeak = targetuser.canspeak.map(data => data.selectedlanguage )
  
                          if(!allcanspeak.includes(data.name.common)){return ;}
  
  
                          return <img key={id} src={data.flags.png} className='w-[35px] h-[35px] rounded-[50%]' alt="" />
  
  
                      }
  
  
                      )}  </div>
  
                             {/* Want To Learn */}
                             <div className="wanttotalk flex items-center gap-[10px] flex-wrap">Want To Learn:  {countries.map((data, id) => 
                      {
  
                          const allcanspeak = targetuser.wanttolearn.map(data => data.selectedlanguage )
  
                          if(!allcanspeak.includes(data.name.common)){return ;}
  
  
                          return <img key={id} src={data.flags.png} className='w-[35px] h-[35px] rounded-[50%]' alt="" />
  
  
                      }
  
  
                      )}  </div>
  
  
        
  
                   </div>
  
  
  
                   <br /><br />
  
  
                   
  
  
  
  
  
  
  
  
  
  
  
           </div>
  
  
      </div>
     </div>
    }



  return (

    <Suspense fallback={<div>Loading...</div>}>
      <Profile></Profile>
    </Suspense>
   
  )
}
    