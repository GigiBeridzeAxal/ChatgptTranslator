'use client'
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import useJwtauth from '../hooks/useJwtauth'
import Chatheader from './components/Chatheader'
import SearchChatPeople from './components/SearchChatPeople'
import ChatLastmessaged from './components/ChatLastmessaged'

export default function page() {
    const {userinfo , profile} = useAuth()
    const {decoded} = useJwtauth()
    const [profileopened , setprofileopened] = useState(false)

    
  return (
  <>
  <div className="bg-white w-[100%] h-[100vh] text-black">
  <Chatheader></Chatheader>
  <SearchChatPeople></SearchChatPeople>
  <br />
  <hr />
  <ChatLastmessaged></ChatLastmessaged>
  </div>
 
  </>
  )
}
