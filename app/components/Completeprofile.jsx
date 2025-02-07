'use client'
import axios from 'axios'
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'

export default function Completeprofile() {

    const [uploadedpic , setuploadedpic] = useState(0)
    const {userinfo} = useAuth()


    const Finish = async() => {

       const uploadimageindir = await axios.post('/api/uploadimage' , {image:uploadedpic})




       if(uploadimageindir.status == 200){
        const setprofilepic = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "changeprofilepic" , {image:uploadimageindir.data , email:userinfo.email})

        console.log(setprofilepic.status)
        if(setprofilepic.status == 200){
            window.location = '/'
        }

       }

      

    }

    const changepicture = (e) => {
        const reader = new FileReader()

        reader.readAsDataURL(e.target.files[0])


        reader.onload  = () => {
            setuploadedpic(reader.result)
        }
    }
  return (
    <div className="compleateprofile w-[100%] h-[100vh] flex items-center justify-center ">
        <div className="compleateprofileframe flex flex-col gap-[75px] items-center justify-center">

            <div className="process hidden flex items-center justify-center gap-[50px] font-[500]">
                <div className="completer">Profile Picture</div>
                <div className="completer text-gray-300">Select Language</div>
            </div>

            <div className="processtittle text-[26px] text-gray-600 font-[300]">Choose Your Profile Picture</div>


            <input onChange={(e) => changepicture(e)}  className='hidden' type="file" name="" id="uploadpic" />
            <label  htmlFor="uploadpic"><div style={uploadedpic !== 0 ? {backgroundImage:`url(${uploadedpic})`} : null}  className="profileuploader">{uploadedpic !== 0 ?  null: <div className="clickheretoupload">Click Here to Upload</div> }</div> </label>

   
               {uploadedpic !== 0 ?             <button onClick={() => Finish()} className="next bg-blue-500 rounded-[2px] text-white p-[10px] text-white w-[150px]">Finish</button> : 
                           <button  className="next bg-gray-400 text-gray-500 p-[10px] rounded-[2px] text-white w-[150px]">Finish</button>}
        </div>
    </div>
  )
}
