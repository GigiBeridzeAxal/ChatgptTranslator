'use client'
import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'
import axios from 'axios'
import { NextResponse } from 'next/server'


export default function useAuth() {


    const token = Cookies.get('JWT')
    const [userinfo , setuserinfo] = useState('wadasd')

    useEffect(() => {



        const getuserinfo = async() => {
            const checkiftokenvaild = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "Verify" , {token})


            if(checkiftokenvaild.status == 201){
         
             Cookies.remove("JWT")
             window.location = '/login'
         
         
            }else{
             const decoded = jwt.decode(token)
    
             setuserinfo(decoded)
    
            }
    
        }
        getuserinfo()
  
    },[])



    return {userinfo}

    
   


}
