import { useAuthStore } from '@/app/store/useAuthStore'
import axios from 'axios'
import { ArrowRight, Filter, FilterIcon, FilterX, RibbonIcon, Search, Stars } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { LoaderIcon } from 'react-hot-toast'

export default function Usersbylanguage() {

  const [usersbylanguage , setusersbylanguage] = useState([])
  const [bestprofiles , setbestprofiles] = useState([])
    const [countries , setcountries] = useState([])
    const {onlineusers , checkauth , Authuser} = useAuthStore()
    const [search , setsearch] = useState('')


    const sortedusers =usersbylanguage.filter(filt =>   filt.firstname.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
    filt.lastname.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || filt.canspeak.map(lang => lang.selectedlanguage.toLocaleLowerCase().replace("" , '')).includes(search.toLocaleLowerCase()))



    useEffect(() => {
      if(Authuser == null) return;

      const getusers = async() => {

        const users = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "getusersbylanguage" , {userid:Authuser.id})
  
        if(users.status == 200){
         // const jsonstring = JSON.stringify(users.data.AiSuggestedData, null , 2)
      //   console.log(JSON.parse(jsonstring))
      console.log(users.data.BestUsers.map(data => data._doc))
        setusersbylanguage(users.data.getusers.filter(filt => filt._id !== Authuser.id))
         setbestprofiles(users.data.BestUsers.filter(filt => filt._doc._id !== Authuser.id).map(data => data._doc))
        }
  
      }
      getusers()

    },[Authuser])

  useEffect(() => {

    checkauth()
   

    const getc = async () => {

      const getcountries = await axios.get('https://restcountries.com/v3.1/all')
      setcountries(getcountries.data)
      console.log(getcountries.data)

  }
  getc()
  },[])




  return (
    <div className="usersbylanguage pt-[100px]">
      <div className="usersbylanguageframe p-[40px]">

      <div className="userlist flex flex-col  items-center gap-[5px]">

           <h1 className='w-[100%] p-[20px] flex items-center gap-[15px]' ><Stars></Stars>당신을 위한 최고의 프로필</h1>
{bestprofiles[0] !== undefined ? 

<div className="users">
{bestprofiles.map(data => (
  <button onClick={() => window.location = `/profile?id=${data._id}`} key={data._id} className="usersfetchedlsit bg-white text-black m-[10px] p-[10px] flex flex-col rounded-[15px] ">

    <div className="firstline flex-wrap  p-[20px] flex items-center justify-between">
      <div className="left relative"><div className='profilepic profileforusersbylanguage ' width={130} style={{ backgroundImage: `url(${data.profilepicture})` }} alt="" /> 
      {onlineusers.includes(data._id) ?<div className="usersbyonline bg-teal-500"></div> :<div className="usersbyonline bg-gray-500"></div> }

      </div>
      <div className="right flex-col flex gap-[15px]">

         <div className="firstname text-start">
          <div className="tittle text-gray-500 text-[12px]">이름</div>
          <div className="name breakword  text-[20px]">{data.firstname.length > 8 ? data.firstname.slice(0,8) + ".." : data.firstname}</div>
         </div>

         <div className="lastname text-start">
          <div className="tittle text-gray-500 text-[12px]">성</div>
          <div style={{textTransform:'lowercase'}} className="text-[24px] flex items-center justify-center "> <div className="lastname">{ data.lastname[0]} </div> { data.lastname.length > 8 ?  data.lastname.replace(data.lastname[0] , '').slice(0,8) + ".." : data.lastname.replace(data.lastname[0] , '') }</div>
         </div>


      </div>
      <hr />
    </div>
    <hr />

    <div className="speaks pl-[20px]   text-start">
      <div className="tittle pt-[10px] text-[13px] text-gray-500">언어</div>
      <br />
           
           <div className="langs ">
           <div className="speakinglanguages  flex f items-center gap-[5px]"> 말하다:
      {data.canspeak.map((data ,index) => {

const flag = countries.find(name => name.name.common == data.selectedlanguage)

if(index < 2){
return flag.flags ? <img key={index} className='speaklanguagesflags' width={25}  src={flag.flags.png} ></img> : null

}else{
return null
}



})} <div className="plus">{data.canspeak.length > 2 ? <div className="plusone bg-red-500 rounded-[50%] w-[23px] h-[23px] flex items-center justify-center p-[px] text-[13px] text-white">+{data.canspeak.length - 2}</div> : null}</div> </div>
<div className="speaks mt-[10px] flex items-center  gap-[10px]">배우고 싶다: {data.wanttolearn.map((data ,index) => {

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


<span className='text-gray-500 text-[12px] mb-[5px]' >기다리세요..</span>
  <LoaderIcon className='size-9'></LoaderIcon>



<button   className="usersfetchedlsit  m-[10px] p-[10px] flex flex-col w-[95%]">


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

      <div className="userlist flex flex-col  items-center gap-[5px]">
      <br /><br />
<div className="listheader w-[100%] p-[20px] flex items-center justify-between"><h1>모든 사용자</h1> <div className="userssearch flex items-center gap-[15px]"> <div className="search bg-slate-950/50 p-[10px] flex items-center gap-[10px]"><input className='listheadersearch w-[300px]' onChange={(e) => setsearch(e.target.value)}  type="text" placeholder='사용자 검색...' /> <Search></Search></div> <div className="filter p-[10px] bg-slate-700/40"><FilterIcon></FilterIcon></div>  </div> </div>

{usersbylanguage[0] !== undefined ? 

<div className="users">
{ sortedusers.length !== 0 ?  sortedusers.map(data =>  (
  <button onClick={() => window.location = `/profile?id=${data._id}`} key={data._id} className="usersfetchedlsit bg-white text-black m-[10px] p-[10px] flex flex-col rounded-[15px] ">

    <div className="firstline wrapedcomp p-[20px] flex items-center justify-between">
      <div className="left relative"><div className='profilepic ' width={130} style={{ backgroundImage: `url(${data.profilepicture})` }} alt="" /> 
      {onlineusers.includes(data._id) ?<div className="usersbyonline bg-teal-500"></div> :<div className="usersbyonline bg-gray-500"></div> }

      </div>
      <div className="right flex-col flex gap-[15px]">

         <div className="firstname text-start">
          <div className="tittle text-gray-500 text-[12px]">이름</div>
          <div className="name breakword  text-[16px]">{data.firstname.length > 8 ? data.firstname.slice(0,8) + ".." : data.firstname}</div>
         </div>

         <div className="lastname text-start">
          <div className="tittle text-gray-500 text-[12px]">성</div>
          <div style={{textTransform:'lowercase'}} className="text-[16px] flex items-center justify-center "> <div className="lastname">{ data.lastname[0]} </div> { data.lastname.length > 8 ?  data.lastname.replace(data.lastname[0] , '').slice(0,8) + ".." : data.lastname.replace(data.lastname[0] , '') }</div>
         </div>


      </div>
      <hr />
    </div>
    <hr />

    <div className="speaks pl-[20px]   text-start">
      <div className="tittle pt-[10px] text-[13px] text-gray-500">언어</div>
      <br />
           
           <div className="langs ">
           <div className="speakinglanguages  flex f items-center gap-[5px]"> 말하다:
      {data.canspeak.map((data ,index) => {

const flag = countries.find(name => name.name.common == data.selectedlanguage)

if(index < 2){
return flag.flags ? <img key={index} className='speaklanguagesflags' width={25}  src={flag.flags.png} ></img> : null

}else{
return null
}



})} <div className="plus">{data.canspeak.length > 2 ? <div className="plusone bg-red-500 rounded-[50%] w-[23px] h-[23px] flex items-center justify-center p-[px] text-[13px] text-white">+{data.canspeak.length - 2}</div> : null}</div> </div>
<div className="speaks mt-[10px] flex items-center  gap-[10px]">배우고 싶다: {data.wanttolearn.map((data ,index) => {

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



)) : <div className='w-[100%] flex items-center gap-[15px] justify-center flex-col h-[45vh]' >

  <RibbonIcon className='size-[150px]' ></RibbonIcon>

  <h1 className='text-white text-[24px]'>죄송합니다. 사용자를 찾을 수 없습니다.</h1>

  
  </div>}
  
</div>
:   

<>


<span className='text-gray-500 text-[12px] mb-[5px]' >기다리세요..</span>
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
