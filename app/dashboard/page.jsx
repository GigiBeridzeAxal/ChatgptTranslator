'use client'
import React from 'react'
import DashHeader from './components/DashHeader'
import Mainpeople from './components/Mainpeople'
import useRenew from '../hooks/useRenew'

export default function page() {
  const {renewtime} = useRenew()

  setInterval(() => {
    renewtime()
  }, 3500);


  return (
    <>
    <DashHeader></DashHeader>
    <Mainpeople></Mainpeople>
    </>
  )
}
