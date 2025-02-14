'use client'
import useJwtauth from '@/app/hooks/useJwtauth'
import { useAuthStore } from '@/app/store/useAuthStore'
import React, { useEffect } from 'react'

export default  function ChatLastmessaged() {

  const {checkauth , Authuser} = useAuthStore()

  useEffect(() => {
    checkauth()
  },[checkauth])

  console.log(Authuser)




  return (
    <div className='text-black' ></div>
  )
}
