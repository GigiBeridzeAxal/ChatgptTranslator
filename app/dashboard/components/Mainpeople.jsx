'use client'
import useAuth from '@/app/hooks/useAuth'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Mainpeople() {

    const [users , setusers] = useState([])
    const [usersfinder , setnotfindusers] = useState(true)
    const [userpictures , setuserpictures] = useState([

    ])

    const {userinfo , user , profile} = useAuth()
    





    useEffect(() => {

        const checkuserlastonline = async() => {

            const getlastonlinedata = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "checkuserlastonline")
    
            if(getlastonlinedata.status == 200){
    
                const lastOnlineData = getlastonlinedata.data;
    
                setusers((perv) => perv.map(data => 
                {
                    const updateddata = lastOnlineData.find(name => name.email == data.email)

                    if(updateddata){
                        return {...data , lastonline:updateddata.lastonline}
                    }
                }
                
                ))
    
              
            }
    
        }
      
        setInterval(() => {
            checkuserlastonline()  
        }, 15000);
    

        

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
        <div className="mainpeopleframe flex items-center justify-center flex-col gap-[15px] pt-[130px]">

            <div className="peoplemayyoulike w">People Should You like</div>

            <div className="profileimages gap-[15px] p-[15px] flex items-center ">

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
              </> : <div className="notfound">users Not Found</div>
               
                  


                  
                : users.map(data => (
                    <button onClick={() => window.location = `/profile?id=${data._id}`} key={data._id} className="profileinfo flex flex-col w-[100px] items-center justify-center">
                    <img   className='ProfilePictop' width={50} height={50} src={data.profilepicture} />
                    
                    <div  className="name flex items-center justify-center gap-[2px]">{( Date.now() - new Date(data.lastonline)) > 10000 ?  <div className="online bg-gray-500 w-[8px] rounded h-[8px]"></div> :  <div className="online bg-teal-500 w-[8px] rounded h-[8px]"></div> } {data.firstname}</div>
                    <div className="div bg-black text-white mb-[25px]"></div>
    
                    </button>
                 
        
                   
                
                   
                )) }

          
           
  
            </div>


       
          
  
           
      

        </div>
    </div>
  )
}
