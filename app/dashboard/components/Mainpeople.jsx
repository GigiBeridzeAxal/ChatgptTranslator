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
      
        console.log(user , profile)

        const getalluser = async() => {
            const getusers = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "gettopuser")
            if(getusers.status == 200){
                
                if(user){
                    const alluser = getusers.data.filter(data => data.email !== user[0].email)
                    console.log(alluser)

                    setusers(alluser)

                    alluser.map(async(data) => {
                        console.log(data)
                        const getpictures = await axios.post('/api/imagefinder' , {imagename:data.profilepicture})
                        const updated = [...userpictures , {imagename:data.profilepicture , image:getpictures.data}]
                        setuserpictures(prevUserPictures => [
                            ...prevUserPictures, 
                            { imagename: data.profilepicture, image: getpictures.data }
                          ]);
                          
  
                        
                       

                    
                    })
                    
                }
  
           
                

     
    
            }
        }
        getalluser()

    },[user])





    
  return (
    <div className="mainpeople">
        <div className="mainpeopleframe pt-[130px]">

            <div className="profileimages gap-[15px] p-[15px] flex items-center ">
            {users.map((data) => {
            const find = userpictures.find(pic => pic.imagename === data.profilepicture)
           return <div key={data._id} >{find ? <img width={50} className='ProfilePictop' height={50} src={find.image} alt="" /> : null }</div>
           }
  
           )}
            </div>


       
          
  
           
      

        </div>
    </div>
  )
}
