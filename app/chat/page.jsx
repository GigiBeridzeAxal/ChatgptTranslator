'use client'
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import useJwtauth from '../hooks/useJwtauth'
import Chatheader from './components/Chatheader'

import ChatLastmessaged from './components/ChatContainer'

export default function page() {
    const {userinfo , profile} = useAuth()
    const {decoded} = useJwtauth()
    const [profileopened , setprofileopened] = useState(false)

    
  return (
  <>
  <div className="bg-slate-950 w-[100%] h-[100vh] text-white">
  <Chatheader></Chatheader>

  <ChatLastmessaged></ChatLastmessaged>
  </div>
 
  </>
  )
}
