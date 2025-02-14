import axios from 'axios'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import React from 'react'

export default function useJwtauth() {

    const token = Cookies.get('JWT')

    const decoded = jwt.decode(token)

    const userdata = async() => {

        const getuserid = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "getuserinfo" , {email:decoded.email})
        console.log(getuserid.data)

        if(getuserid.status == 200){
            return getuserid.data
        }

   

    }







    return {decoded , userdata}






}
