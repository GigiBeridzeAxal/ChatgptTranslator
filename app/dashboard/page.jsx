'use client'
import React, { useEffect } from 'react'
import DashHeader from './components/DashHeader'
import Mainpeople from './components/Mainpeople'
import useRenew from '../hooks/useRenew'
import Usersbylanguage from './components/Usersbylanguage'
import { useAuthStore } from '../store/useAuthStore'


export default function page() {
  const {renewtime} = useRenew()
  const {checkauth} = useAuthStore()
    useEffect(() => {
      checkauth()
    },[])


  
  
  


  return (
    <>
    <DashHeader></DashHeader>
    <Mainpeople></Mainpeople>
    <Usersbylanguage></Usersbylanguage>
    </>
  )
}
