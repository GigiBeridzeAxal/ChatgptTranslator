import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import React from 'react'

export default function useJwtauth() {

    const token = Cookies.get('JWT')

    const decoded = jwt.decode(token)





    return {decoded}






}
