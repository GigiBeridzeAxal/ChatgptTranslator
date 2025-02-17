import { useAuthStore } from '@/app/store/useAuthStore'
import axios from 'axios'
import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { LoaderIcon } from 'react-hot-toast'

export default function Usersbylanguage() {

  const [usersbylanguage , setusersbylanguage] = useState([])
    const [countries , setcountries] = useState([])
    const {onlineusers} = useAuthStore()








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




  return (
    <div className="usersbylanguage">
      <div className="usersbylanguageframe p-[40px]">

        <div className="userlist flex flex-col  items-center gap-[5px]">
  
          {usersbylanguage[0] !== undefined ? 
          
          <div className="users">
  {usersbylanguage.map(data => (
            <button onClick={() => window.location = `/profile?id=${data._id}`} key={data._id} className="usersfetchedlsit bg-white text-black m-[10px] p-[10px] flex flex-col rounded-[15px] ">

              <div className="firstline p-[20px] flex items-center justify-between">
                <div className="left relative"><div className='profilepic ' width={130} style={{ backgroundImage: `url(${data.profilepicture})` }} alt="" /> 
                {onlineusers.includes(data._id) ?<div className="usersbyonline bg-teal-500"></div> :<div className="usersbyonline bg-gray-500"></div> }

                </div>
                <div className="right flex-col flex gap-[15px]">

                   <div className="firstname text-start">
                    <div className="tittle text-gray-500 text-[12px]">First Name</div>
                    <div className="name text-[24px]">{data.firstname}</div>
                   </div>

                   <div className="lastname text-start">
                    <div className="tittle text-gray-500 text-[12px]">Last Name</div>
                    <div style={{textTransform:'lowercase'}} className="text-[24px] flex items-center justify-center "> <div className="lastname">{data.lastname[0]} </div> {data.lastname.replace(data.lastname[0] , '')}</div>
                   </div>


                </div>
                <hr />
              </div>
              <hr />

              <div className="speaks pl-[20px]   text-start">
                <div className="tittle pt-[10px] text-[13px] text-gray-500">Languages</div>
                <br />
                     
                     <div className="langs ">
                     <div className="speakinglanguages  flex f items-center gap-[5px]"> Speak:
                {data.canspeak.map((data ,index) => {

const flag = countries.find(name => name.name.common == data.selectedlanguage)

  if(index < 2){
    return <img key={index} className='speaklanguagesflags' width={25}  src={flag.flags.png} ></img>
  }else{
    return null
  }



})} <div className="plus">{data.canspeak.length > 2 ? <div className="plusone bg-red-500 rounded-[50%] w-[23px] h-[23px] flex items-center justify-center p-[px] text-[13px] text-white">+{data.canspeak.length - 2}</div> : null}</div> </div>
 <div className="speaks mt-[10px] flex items-center  gap-[10px]">Want To Learn: {data.wanttolearn.map((data ,index) => {

const flag = countries.find(name => name.name.common == data.selectedlanguage)
if(index < 2){
  return <img key={index} className='speaklanguagesflags' width={25}  src={flag.flags.png} ></img>

}else{
  null
}

})}<div className="plus">{data.canspeak.length > 2 ? <div className="plusone bg-red-500 rounded-[50%] w-[23px] h-[23px] flex items-center justify-center p-[px] text-[13px] text-white">+{data.canspeak.length - 2}</div> : null}</div>
                </div>
                     </div>
                      <br />

             
               

              

              </div>





            </button>



          ))}
            
          </div>
         :   
          
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
