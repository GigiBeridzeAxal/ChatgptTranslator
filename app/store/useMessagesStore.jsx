'use client'
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { useSearchParams } from "next/navigation";


export const useMessagesStore = create((set,get) => ({


        
    queryuser:null,
    allmessage:[],
    userswhosentmessage:[],
    userlistisloading:true,
    isfiltering:true,
    rerender:'',


  
    filterpositions:async() => {



        try{

            const userswhosentmessage = get().userswhosentmessage

            const allmessage = get().allmessage 
    
            const filtereddata = userswhosentmessage.map((user) => {
    
                const usermessage = allmessage.filter(filt => filt.sendby == user._id || filt.sendto == user._id )
    
                const lastmessage = usermessage.at(-1).sendtime



    
    
                return {
                    ...user,
                    LastmessageSendtime: lastmessage
                }
    
    
    
    
    
    
    
    
            }).sort((a ,b) => b.LastmessageSendtime - a.LastmessageSendtime)
      
            set({isfiltering:false}) 
            set({userswhosentmessage:filtereddata}) 


        }catch(err){
            console.log(err)
        }finally{
    
            
        }


    },

    userslist:async(Authuser , queryuser) => {

        try{

            const getuserlist = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "userswhosentmessage" , {queryuser:queryuser , Authuser})






            set({userswhosentmessage:getuserlist.data})
           get().filterpositions()


            
        }catch(err) {
            console.log(err)
        }



    },

    
   userfromquery:async(userid) => { 

    try{


        
       
        set({queryuser:get().userswhosentmessage.find(v => v._id === userid)})
      //  get().filterpositions()
      
        
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

   getmessages:async(Authuser) => {


    try{
        const getmsg = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "getmessages" , {userid:Authuser.id})

 
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
        const Authuser = useAuthStore.getState().Authuser;
        const queryuser = get().queryuser



        if(socket){

            socket.on("NewMessage" , (data) => {

       
                set({allmessage:[...get().allmessage , data]})
                set({userlistisloading:false})

                console.log(queryuser , Authuser)
                set({rerender: Date.now()})
                get().filterpositions()
                
          


   
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