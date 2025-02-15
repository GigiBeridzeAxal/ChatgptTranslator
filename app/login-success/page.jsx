'use client'
import Cookies from 'js-cookie'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function page() {

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
