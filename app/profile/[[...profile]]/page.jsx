'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'

export default function page() {

    const searchparams = useSearchParams()

    const id = searchparams.get('id')

    const [profileinfo , setprofileinfo] = useState([])

    const [countries , setcountries] = useState([])


    useEffect(() => {

        const getc = async () => {

            const getcountries = await axios.get('https://restcountries.com/v3.1/all')
            setcountries(getcountries.data)
            console.log(getcountries.data)
      
        }
        getc()

        const getprofileuserinfo = async() => {

            const getinfo = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "getprofilebyid" , {id:id})

            if(getinfo.status == 200){

                setprofileinfo(getinfo.data)
                console.log(getinfo.data)

            }else{
                window.location = '/'
            }



        }
        getprofileuserinfo()


    },[])

  return (
    <div className="profilepage w-[100%] h-[100vh] flex flex-col items-center justify-center">
        <button onClick={() => window.location = '/'} className="backforprofile flex items-center justify-center gap-[10px] "><img width={30} src="Back.png" alt="" /> Back</button>
        <div className="profilepageframe p-[20px] w-[100%]">
            {profileinfo.map(data => (
                <div key={data._id}  className="profileframe flex flex-col gap-[15px] w-[100%]">
 <div className="firstline gap-[15px] w-[100%] flex items-end text-white justify-between"><div className="sf flex items-center gap-[15px] text-black">

 <img width={100} src="Profile2.png" alt="" /> 
 <div className="sg flex flex-col text-slate-700">{data.firstname} <span>{data.lastname}</span></div>
    
    </div> <button className="sendmessage rounded-[5px] bg-blue-500 mb-[25px] text-[14px] p-[5px]">Send Message</button></div>

              <div className="desc p-[10px]  text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur minima quidem commodi et eaque repellendus ut ad maxime quis? Doloremque, reprehenderit debitis neque aspernatur, iusto dolorum cum rerum dolorem ex officia dolores nobis cupiditate, quod numquam. Delectus a similique nam?</div>
              
              <div className="languages profilebg p-[10px] gap-[10px] flex flex-col">

              <div className="speaks  flex items-center gap-[10px]">Speaks: {data.canspeak.map((data ,index) => {

const flag = countries.find(name => name.name.common == data.selectedlanguage)

return <img key={index} className='speaklanguagesflags' width={25}  src={flag.flags.png} ></img>

})}</div>
 <div className="speaks  mt-[10px] flex items-center gap-[10px]">Want To Learn: {data.wanttolearn.map((data ,index) => {

const flag = countries.find(name => name.name.common == data.selectedlanguage)

return <img key={index} className='speaklanguagesflags' width={25}  src={flag.flags.png} ></img>

})}</div>
              </div>
             
                </div>

                
     
            ))}
      

        </div>
    </div>
  )
}
