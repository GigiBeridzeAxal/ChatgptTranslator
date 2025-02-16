import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { useAuthStore } from "./app/store/useAuthStore"

 


export default async function middleware(request){


   
   const url = new URL(request.url)

   if(url.pathname == '/completeprofile'){
      if((await cookies()).get('JWT')){
         const token = (await cookies()).get('JWT')

         

         const decoded = jwt.decode(token.value)


         

         const usercompleatedprofile = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'usercompleatedprofile' , {email:decoded.email})



         

         if(usercompleatedprofile.status == 200){
            return NextResponse.redirect(new URL('/' , request.url))
         }

     
 
       }else{
         return NextResponse.redirect(new URL('/' , request.url))
       }
   }
   if(url.pathname == '/dashboard'){
      if((await cookies()).get('JWT')){
         const token = (await cookies()).get('JWT')

         

         const decoded = jwt.decode(token.value)


         

         const usercompleatedprofile = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'usercompleatedprofile' , {email:decoded.email})


         

         if(usercompleatedprofile.status == 201){
            return NextResponse.redirect(new URL('/completeprofile' , request.url))
         }

     
 
       }else{
         return NextResponse.redirect(new URL('/' , request.url))
       }
   }
   if(url.pathname == '/'){

      if((await cookies()).get('JWT')){
         return NextResponse.redirect(new URL('/dashboard' , request.url))
 
       }
   }
   if(url.pathname =='/register' || url.pathname == '/login' ){

      if((await cookies()).get('JWT')){
        return NextResponse.redirect(new URL('/' , request.url))

      }

   }

}