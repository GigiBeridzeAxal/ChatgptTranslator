'use client'
import axios from "axios"
import Cookies from "js-cookie"
import {create} from 'zustand';
import jwt from 'jsonwebtoken'
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";


export const useAuthStore = create((set , get) => ({

    Authuser:null,
    isCheckingAuth:true,
    socket:null,
    onlineusers:[],
    receviedmessages:[],
    userdata:[],
    userplan:'Free',



    buyitem:async(email , item) => {

        try{

           const updateuser = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "buyitem" , {email:email , item:item})
             
           set({userdata:{...get().userdata , credits:updateuser.data}})
           console.log(updateuser.data)
           if(updateuser.status == 200){
            toast.success("You Succesfuly Buy Translate")
           }
           

        }catch(err){
            console.log(err)
        }



    },

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

    getuserdata:async() =>{


        try{

            const user = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "getuserinfo" , {email:get().Authuser.email})

            console.log(user.data[0])

            if(user.data[0]){


                if(user.data[0].plan[0].plan == "Premium"){
                    if ((Date.now() - new Date(user.data[0].plan[0].activationtime) ) / 1000 > 2628000  ) {

                        console.log("Working" ,get().Authuser.id )

                        const endplan = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'planend' , {userid:get().Authuser.id})
    
                    }else{
                        set({userplan:user.data[0].plan[0].plan})
                    }
                }

               

                set({userdata:user.data[0]})

            }



        }catch(err){
            console.log(err)
        }

    },


    checkauth: async () => {

        try{
            const token = Cookies.get('JWT')
            
            const isuserauth = await axios.post(process.env.NEXT_PUBLIC_BACKEND  + "Verify" , {token:token})

            const decoded = jwt.decode(isuserauth.data)



            set({Authuser:decoded})
            if(get().socket == null){
                get().connectsocket()
            }

    


         
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


        const userid = get().Authuser.id


        const socket = io(process.env.NEXT_PUBLIC_BACKEND , {
            query:{userID:userid}
        })
        socket.connect()

        socket.on('NewUser' , (users) => {

            

            set({onlineusers:users})

        })

        socket.on("NewMessage" , (data) => {
            console.log(data)
            toast.success(`You Have New Message ${data.message}` )

        })




        set({socket:socket})


    },

    

    disconnectsocket:async() => {
        if(get().socket !== null) get().socket.disconnect()
    }

   

}))