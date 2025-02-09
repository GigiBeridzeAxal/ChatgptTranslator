'use client'

import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'
import axios from 'axios'




export default function useRenew() {
    const token = Cookies.get('JWT')

    
    const renewtime = async() => {
      const decoded = jwt.decode(token)
      if(decoded){
        const renew = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "renewtime" , {email:decoded.email})
      }

  }




  return {renewtime}


}
