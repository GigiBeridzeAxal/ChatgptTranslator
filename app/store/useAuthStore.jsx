import axios from "axios"
import Cookies from "js-cookie"
import {create} from 'zustand';
import jwt from 'jsonwebtoken'
import toast from "react-hot-toast";



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

            set({Authuser:isuserauth.data})

        }catch(err){
            console.log(err)
        }finally{
            set({isCheckingAuth:false})

        }

    },

   

}))