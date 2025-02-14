'use client'
import React from 'react'
import DashHeader from './components/DashHeader'
import Mainpeople from './components/Mainpeople'
import useRenew from '../hooks/useRenew'
import Usersbylanguage from './components/Usersbylanguage'

export default function page() {
  const {renewtime} = useRenew()

  setInterval(() => {
    renewtime()
  }, 3500);


  return (
    <>
    <DashHeader></DashHeader>
    <Mainpeople></Mainpeople>
    <Usersbylanguage></Usersbylanguage>
    </>
  )
}
