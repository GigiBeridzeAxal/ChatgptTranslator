'use client'
import useAuth from '@/app/hooks/useAuth'
import axios from 'axios'
import { Loader, Loader2Icon, LoaderPinwheelIcon, MessagesSquare } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { LoaderIcon } from 'react-hot-toast'

export default function Mainpeople() {

    const [users , setusers] = useState([])
    const [usersfinder , setnotfindusers] = useState(true)
    const [userpictures , setuserpictures] = useState([

    ])

    const {userinfo , user , profile} = useAuth()
    





    useEffect(() => {


        

        const getalluser = async() => {
            const getusers = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "gettopuser")
            if(getusers.status == 200){
                
                if(user){
                    const alluser = getusers.data.filter(data => data.email !== user[0].email)
   

                   setusers(alluser)


                   if(alluser[0] === undefined){
                    setnotfindusers(false)
    
                   }

                  
                    
                }
  
           
                

     
    
            }
        }
       getalluser()

    },[user])





    
  return (
    <div className="mainpeople">
        <div className="mainpeopleframe  flex items-center justify-center flex-col gap-[15px] pt-[120px]">
        <div className="logoframe text-white p-[10px]">
        <MessagesSquare className='w-[35px] h-[35px] text-indigo-500'></MessagesSquare>
      </div>
            <div className="peoplemayyoulike w">사람들은 당신이 좋아해야</div>

            {users[0] == undefined ? usersfinder == true ?           <>
        <span className='text-gray-500 text-[12px] mb-[5px]' >기다리세요..</span>
            <LoaderIcon className='size-9'></LoaderIcon>

            </>  : null : null}

            <div className="profileimages flex gap-[15px] p-[40px] flex items-center ">

                {users[0] == undefined ?

                usersfinder == true ?  <>
                 
  
                <div className="loaderimage">
                      <div className="loaderline"></div>
                  </div>
                  <div className="loaderimage">
                      <div className="loaderline"></div>
                  </div>

                  <div className="loaderimage">
                      <div className="loaderline"></div>
                  </div>

                  <div className="loaderimage">
                      <div className="loaderline"></div>
                      </div> 
              </> : <div className="notfound">사용자를 찾을 수 없습니다</div>
               
                  


                  
                : users.map(data => (
                    <button onClick={() => window.location = `/profile?id=${data._id}`} key={data._id} className="profileinfo flex flex-col w-[100px] items-center justify-center">
                    <img   className='ProfilePictop' width={50} height={50} src={data.profilepicture} />
                    
                    <div  className="name flex items-center justify-center gap-[2px]">{( Date.now() - new Date(data.lastonline)) > 10000 ?  <div className="online bg-gray-500 w-[8px] rounded h-[8px]"></div> :  <div className="online bg-teal-500 w-[8px] rounded h-[8px]"></div> } {data.firstname}</div>
                    <div className="div bg-black text-white mb-[10px]"></div>
    
                    </button>
                 
        
                   
                
                   
                )) }

          
           
  
            </div>


       
          
  
           
      

        </div>
    </div>
  )
}
