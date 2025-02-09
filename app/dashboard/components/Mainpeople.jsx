'use client'
import useAuth from '@/app/hooks/useAuth'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Mainpeople() {

    const [users , setusers] = useState([])
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

                {users[0] == undefined ? <div className="profilesloading flex items-center justify-center gap-[25px] w-[110%] ">
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



                </div> : users.map(data => (
                <div key={data._id} className="profileinfo flex flex-col w-[100px] items-center justify-center">
                <img   className='ProfilePictop' width={50} height={50} src={data.profilepicture} />
                <div  className="name flex items-center justify-center gap-[2px]"><div className="online bg-teal-500 w-[8px] rounded h-[8px]"></div> {data.firstname}</div>
                </div>
             
    
               
            
               
            )) }

          
           
  
            </div>


       
          
  
           
      

        </div>
    </div>
  )
}
