'use client'
import Cookies from 'js-cookie'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'





const  LoginSuccess = () => {

    const token = useSearchParams().get('token')

    useEffect(() => {
        console.log(token)

        Cookies.set("JWT" , token)
        window.location ='/'


    },[])
  return (
    <div></div>
  )
}


export default function Page() {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginSuccess />
    </Suspense>
  );
}