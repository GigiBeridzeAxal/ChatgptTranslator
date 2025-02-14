import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { LoaderIcon } from 'react-hot-toast'

export default function Usersbylanguage() {

  const [usersbylanguage , setusersbylanguage] = useState([])
    const [countries , setcountries] = useState([])
  useEffect(() => {

    const getusers = async() => {

      const users = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "getusersbylanguage")

      if(users.status == 200){
        console.log(users)
        setusersbylanguage(users.data)
      }

    }
    getusers()

    const getc = async () => {

      const getcountries = await axios.get('https://restcountries.com/v3.1/all')
      setcountries(getcountries.data)
      console.log(getcountries.data)

  }
  getc()
  },[])


  
  useEffect(() => {

    const checkuserlastonline = async() => {

        const getlastonlinedata = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "checkuserlastonline")

        if(getlastonlinedata.status == 200){

            const lastOnlineData = getlastonlinedata.data;

            setusersbylanguage((perv) => perv.map(data => 
            {
                const updateddata = lastOnlineData.find(name => name.email == data.email)

                if(updateddata){
                    return {...data , lastonline:updateddata.lastonline}
                }
            }
            
            ))

          
        }

    }
  setInterval(() => {
    checkuserlastonline()
  }, 20000);
  })

  return (
    <div className="usersbylanguage">
      <div className="usersbylanguageframe">

        <div className="userlist flex flex-col  items-center gap-[5px]">
          {usersbylanguage[0] !== undefined ? usersbylanguage.map(data => (
            <button onClick={() => window.location = `/profile?id=${data._id}`} key={data._id} className="usersfetchedlsit bg-white text-black m-[10px] p-[10px] flex flex-col w-[95%]">


          <div className="line flex ">

          <div className="bylanguageprofile flex items-center justify-center"><img width={100} src={data.profilepicture} alt="" /></div>
          <div className="firstnae p-[10px] flex w-[100%] items-center  justify-between"><div className="first text-[16px]">{data.firstname} {data.lastname} </div> {( Date.now() - new Date(data.lastonline)) > 10000 ?  <div className="online bg-gray-500 w-[8px] rounded h-[8px]"></div> :  <div className="online bg-teal-500 w-[8px] rounded h-[8px]"></div> }</div>
         
          </div>
          <div className="second p-[10px] flex flex-col gap-[10px] ">
            <div className="desc text-start text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quia beatae distinctio, doloremque blanditiis qui.</div>
            <div className="speaks flex items-center gap-[10px]">Speaks: {data.canspeak.map((data ,index) => {

             const flag = countries.find(name => name.name.common == data.selectedlanguage)

             return <img key={index} className='speaklanguagesflags' width={25}  src={flag.flags.png} ></img>

            })}</div>
              <div className="speaks mt-[10px] flex items-center gap-[10px]">Want To Learn: {data.wanttolearn.map((data ,index) => {

const flag = countries.find(name => name.name.common == data.selectedlanguage)

return <img key={index} className='speaklanguagesflags' width={25}  src={flag.flags.png} ></img>

})}</div>




          </div>
            </button>



          )) :   
          
          <>
          

          <span className='text-gray-500 text-[12px] mb-[5px]' >Please Wait..</span>
            <LoaderIcon className='size-9'></LoaderIcon>


   
          <button   className="usersfetchedlsit m-[10px] p-[10px] flex flex-col w-[95%]">
      

          <div className="line flex ">

          <div className="bylanguageprofile flex items-center justify-center">      <div className="loaderprofileimage">
                        <div className="loaderline"></div>
                    </div></div>
          <div className="firstnae p-[10px] flex w-[100%] items-center   justify-between"><div className="first flex items-center gap-[10px] text-[16px]">   <div className="preloader  bg-gray-500 h-[30px] w-[100px]"></div>    <div className="preloader  bg-gray-500 h-[30px] w-[100px]"></div> </div> </div>
         
          </div>
          <div className="second p-[10px] flex flex-col gap-[10px] ">
            <div className="desc text-start text-gray-600"><div className="preloader bg-gray-500 h-[80px] w-[50%]"></div>
            <br />
              
            <div className="languages profilebg p-[10px] gap-[10px] flex flex-col">
                        <div className="preloader bg-gray-500 h-[30px] w-[25%]"></div>
                        <div className="preloader bg-gray-500 h-[30px] w-[25%]"></div>
                        </div>
            
            </div></div></button>        </> }
        </div>

      </div>
    </div>
  )
}
