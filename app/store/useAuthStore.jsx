'use client'
import axios from "axios"
import Cookies from "js-cookie"
import {create} from 'zustand';
import jwt from 'jsonwebtoken'
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

export const config = {
    unstable_allowDynamic: [
      '/lib/utilities.js', // allows a single file
      '**/node_modules/function-bind/**', // use a glob to allow anything in the function-bind 3rd party module
    ],
  }

export const useAuthStore = create((set , get) => ({

    Authuser:null,
    isCheckingAuth:true,
    socket:null,



    signin:async(data) => {

        try{
            const login = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'login' , data)

            if(login.status == 200){
                toast.success("You Succesfuly Authenticated")
                Cookies.set('JWT' , login.data)
                window.location = '/dashboard'
            }else{
                toast.error(login.data)
                console.log(login)

            }

        }catch(err){
            console.log(err)
        }

    },

    signup:async(data) => {

       try{

        const signup = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "register" , data)

        console.log(signup , data)

        if(signup.status == 200){
            Cookies.set("JWT" , signup.data)
            window.location = '/'
        }else{
            return toast.error(signup.data)
        }

       }catch(err){
        console.log(err)
       }

    },

    checkauth: async () => {

        try{
            const token = Cookies.get('JWT')
            
            const isuserauth = await axios.post(process.env.NEXT_PUBLIC_BACKEND  + "Verify" , {token:token})

            console.log("Authed" , get().socket)

            if(get().socket == null){
                get().connectsocket()
            }

            set({Authuser:isuserauth.data})

        }catch(err){
            console.log(err)
        }finally{
            set({isCheckingAuth:false})

        }

    },

    logout:async() => {

        Cookies.remove('JWT')
        window.location ='/'
        get().disconnectsocket()
        


    },

    connectsocket:async()  => {

        console.log("Connecting To Socket")
        const socket = io(process.env.NEXT_PUBLIC_BACKEND)
        socket.onopen = () => {
            console.log("Connected")
        }
        console.log(socket)

        set({socket:socket})


    },

    disconnectsocket:async() => {
        if(get().socket !== null) get().socket.disconnect()
    }

   

}))