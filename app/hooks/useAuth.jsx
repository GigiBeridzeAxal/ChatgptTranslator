
import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'
import axios from 'axios'
import io from 'socket.io-client'

import { NextResponse } from 'next/server'



export default function useAuth() {


    const token = Cookies.get('JWT')
    const [userinfo , setuserinfo] = useState('wadasd')
    const [user , setuser] = useState('')
    const [profile , setprofile] = useState(false)
    const decoded = jwt.decode(token)



    const logout = () => {
        Cookies.remove("JWT")
        window.location = '/login'
    }






 
 

    useEffect(() => {





        const getuserinfo = async() => {
            const checkiftokenvaild = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "Verify" , {token})
    


            if(checkiftokenvaild.status == 201){
         
             Cookies.remove("JWT")
             window.location = '/login'
         
         
            }else{
             const decoded = jwt.decode(token)
             const user = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "getuserinfo" , {email:decoded.email})
             if(user.status == 200){
                setuser(user.data)
             }


             if(user.data[0].compleatedprofile){
              // const find = await axios.post('/api/imagefinder' , {imagename:user.data[0].profilepicture})

               if(user.status == 200){
                setprofile(user.data[0].profilepicture)
               }else{
                setprofile('Not Defined')
               }

             }
            
          
             setuserinfo(decoded)
       
    
            }
    
        }
        getuserinfo()

        
  
    },[])



    return {userinfo , user , profile , logout }

    
   


}
