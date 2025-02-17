'use client'
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

export const useMessagesStore = create((set,get) => ({


    queryuser:null,
    allmessage:[],
    userswhosentmessage:[],
    userlistisloading:true,


  

    userslist:async(Authuser) => {

        try{

            const getuserlist = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "userswhosentmessage" , {queryuser:get().queryuser , Authuser})

            console.log(getuserlist.data)

            set({userswhosentmessage:getuserlist.data})
            
        }catch(err) {
            console.log(err)
        }



    },

    
   userfromquery:async(userid) => {

    try{
        console.log(userid)
        if(userid == null){
            set({queryuser:false})
        }else{

            const getuser = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'getuserfromquery' , {userid:userid})

                set({queryuser:getuser.data[0]})

    
    
        }
      
        
    }catch(err){
        console.log(err)
    }



   },

   sendmessage:async(param) => {

    try{

        console.log("Send TIme")
        const send = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "sendprivatemssage" , {param} )

        console.log(send)

    }catch(err) {
        console.log(err)
    }

   } ,

   getmessages:async() => {


    try{
        const getmsg = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "getmessages" , {userid:get().queryuser._id})

 
         const response = getmsg.data

          const data = {...get().allmessage , response}
          

        

        set({allmessage:data.response})



    }catch(err)  {
        console.log(err)
    }




   },

   subscribemessages:async() => {

    try{

        const socket = useAuthStore.getState().socket;



        if(socket){

            socket.on("NewMessage" , (data) => {

       
                set({allmessage:[...get().allmessage , data]})
                set({userlistisloading:false})
                
          


   
            toast.success(`You Have New Message ${data.message}` )

    
        })
        }
     
    }catch(err) {

        console.log(err)
    }








   




   },

   unsubscribemessages:async() => {
    try{
        const socket = useAuthStore.getState().socket;
        socket.off('NewMessage');
   
    }catch(err) {
        console.log(err)
    }

   }






}))