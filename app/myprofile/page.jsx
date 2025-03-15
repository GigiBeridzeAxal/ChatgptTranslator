'use client'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import DashHeader from '../dashboard/components/DashHeader'
import { BoxSelect, BoxSelectIcon, Edit , SearchIcon, Upload, Verified, X } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'


export default function page() {

    const {Authuser , checkauth , getuserdata , userdata} = useAuthStore()
  const [countries , setcountries] = useState([])
  const [profileedit , setprofileedit] = useState(false)
  const [aboutmeedit , setaboutmeedit] = useState(false)
  const [wattotalkedit , setwattotalkedit] = useState(false)
  const [aboutmevalue , setaboutmevalue] = useState("Enter About You")
  const [wanttolearncountriesdropdown  , setwanttolearncountriesdropdown ] = useState(false)
  const [wanttotalkvalue , setwanttotalkvalue] = useState("Enter About You")
  const [languagesearch , setlanguagesearch] = useState("")
  const [uploaded , setuploaded] = useState()
  const [wanttolearn , setwanttolearn] = useState([])
  const [canteachyou , setcanteachyou] = useState([])

  const [canteachyouedit , setcanteachyouedit] = useState(false)

      const [base64 , setbase64] = useState()
  
      const [reloader , setreloader] = useState(0)
  
    useEffect(() => {checkauth()},[])
    useEffect(() => {getuserdata()},[Authuser , reloader])
    useEffect(() => {
        if(userdata.aboutme !== undefined){
            setaboutmevalue(userdata.aboutme)
        }
        if(userdata.liketotalk !== undefined){
            setwanttotalkvalue(userdata.liketotalk)
        }
        if(userdata.wanttolearn !== undefined){

            console.log(userdata.wanttolearn)

            setwanttolearn(userdata.wanttolearn)

            

        }
        if(userdata.canspeak !== undefined){
            setcanteachyou(userdata.canspeak)
        }

    },[userdata])

    const updatewanttolearn = async() => {
        const loadingtoast = toast.loading("Please Wait")


        const change = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'updatewanttolearn' , {email:userdata.email , wanttolearn:wanttolearn})

        if(change){
            toast.dismiss(loadingtoast)
            setreloader(perv => perv + 1)
            setwanttolearncountriesdropdown(false)
            toast.success("Succesfuly Updated")

        }
    }

    const updatecanteachyou = async() => {
        const loadingtoast = toast.loading("Please Wait")


        const change = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'updatecanteachyou' , {email:userdata.email , canteachyou:canteachyou})

        if(change){
            toast.dismiss(loadingtoast)
            setreloader(perv => perv + 1)
            setcanteachyouedit(false)
            toast.success("Succesfuly Updated")

        }
    }


    const updateaboutme = async() => {

        const loadingtoast = toast.loading("Please Wait")


        const change = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'updateaboutme' , {email:userdata.email , aboutme:aboutmevalue})

        if(change){
            toast.dismiss(loadingtoast)
            setreloader(perv => perv + 1)
            setaboutmeedit(false)
            toast.success("About Me Succesfuly Updated")

        }

    }

    const updateliketotalk = async() => {

        const loadingtoast = toast.loading("Please Wait")


        const change = await axios.post(process.env.NEXT_PUBLIC_BACKEND + 'updateliketotalk' , {email:userdata.email , liketotalk:wanttotalkvalue})

        if(change){
            toast.dismiss(loadingtoast)
            setreloader(perv => perv + 1)
            setwattotalkedit(false)
            toast.success("About Me Succesfuly Updated")

        }

    }


    const changepicture = (e) => {
        const reader = new FileReader()

        reader.readAsDataURL(e.target.files[0])


        reader.onload  = () => {
            setuploaded(e.target.files[0])

            setbase64(reader.result)
        }
    }


    const sendrequesttochangeprofile = async() => {
        const formdata = new FormData()
        formdata.append('email' , userdata.email)
        formdata.append('image' , uploaded)

       const loadingtoast = toast.loading("Please Wait")


        const send = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "changeprofilepic"  , formdata ,  {
            headers:{
                'Content-Type':"multipart/formdata"
            }
        })

        if(send){
            toast.dismiss(loadingtoast)
            setreloader(perv => perv + 1)
            setprofileedit(false)
            toast.success("You Succesfuly Change Profile Picture")
        }


    }



    useEffect(() => {

        const getc = async () => {
    
          const getcountries = await axios.get('https://restcountries.com/v3.1/all')
          setcountries(getcountries.data)
          console.log(getcountries.data)
          
    
      }
      getc()
    
      },[])


    if(!userdata._id){
        return; 
    }


  return (
   <div >
    <DashHeader></DashHeader>
    <div className=" w-[100%] pt-[200px] flex items-center justify-center">



         <div className="userprofileeditor flex flex-col gap-[104px] w-[90%] sm:w-[70%]">

            {/* Profile */}

      

            <div className='w-[100%]  flex-wrap gap-[35px] flex items-center sm:justify-between justify-center'>
                <div className="editimage flex items-end">
                <img  className='w-[200px] rounded-[50%] h-[200px]' src={userdata.profilepicture} alt="" />
                <Edit onClick={() => setprofileedit(true)}></Edit>
                </div>

                <div className="sendmsg p-[20px] text-gray-400 bg-gray-300 rounded-[3px]"><button>Send Message {userdata.firstname}</button></div>


            </div>

            {profileedit ? 

            <div  className='w-[100%] fixed h-[100vh]  flex items-center justify-center left-0 top-0'>
                 
                <button  onClick={() => setprofileedit(false)} className="blur  w-[100%] fixed bg-white/50  h-[100vh] top-0 left-0"></button>


                <div className="editor p-[20px] z-[15] bg-gray-100 w-[100%] md:w-[600px] h-[500px]">

                    <h1 className='text-[24px]'>Change Profile Picture</h1>

                        <div className=" flex items-center  justify-center w-[100%]  h-[300px]">
                    
                                       <input onChange={(e) => changepicture(e)} type="file" id='uploaderfile' className='hidden' />
                    
                                       <label htmlFor="uploaderfile" className="border-2 cursor-pointer z-[2] border-blue-500  border-dashed  w-[100%] h-[250px] flex items-center justify-center">
                                       {base64 ? <img width={150} height={150} src={base64} alt="" /> : <label className='cursor-pointer' htmlFor="uploaderfile"><Upload  className='text-black z-[-1] size-[50px]' ></Upload></label> } 
                                       </label>
                             
                    
                                    </div>

                                     <div className='flex items-center gap-[10px] flex-wrap'>          
                                          <button onClick={() => sendrequesttochangeprofile()} className='p-[10px] bg-blue-500 rounded-[2px] text-white'>Change Profile</button>
                                  
                                  <button onClick={() => setprofileedit(false)} className='p-[10px] bg-gray-500 rounded-[2px] text-white'>Cancel</button>

</div>
                </div>

               

            </div>
            
            
            : null}


                 {/* Desc */}

                 <div className='flex flex-col gap-[15px]'>

                    {aboutmeedit ? <>              <div className="wanttotalk  flex items-center gap-[10px]">About Me:          <X className='text-red-500' onClick={() => setaboutmeedit(false)}></X></div>

                    <textarea maxLength={1000}  value={aboutmevalue} onChange={(e) => setaboutmevalue(e.target.value) } className="wantotalkbox h-[350px] border-2 p-[10px] "/> <div className="btns flex items-center gap-[10px] w-[100%] justify-start text-white">
                    <button onClick={() => updateaboutme()} className='p-[10px] bg-blue-500'>Update</button>  <button onClick={() => setaboutmeedit(false)} className='p-[10px] bg-gray-500'>Cancel</button> </div>  </> :  <>              <div className="wanttotalk flex items-center gap-[10px]">About Me:          <Edit onClick={() => setaboutmeedit(true)}></Edit></div>

<div className="wantotalkbox textwrapped  border-2 p-[10px] ">
    {userdata.aboutme}
</div></>}
<br /><br />
            <div className='flex flex-col gap-[15px]'>
            {wattotalkedit ? <>              <div className="wanttotalk  flex items-center gap-[10px]">Want To Talk:          <X className='text-red-500' onClick={() => setwattotalkedit(false)}></X></div>

<textarea maxLength={1000}  value={wanttotalkvalue} onChange={(e) => setwanttotalkvalue(e.target.value) } className="wantotalkbox h-[350px] border-2 p-[10px] "/> <div className="btns flex items-center gap-[10px] w-[100%] justify-start text-white">
<button onClick={() => updateliketotalk()} className='p-[10px] bg-blue-500'>Update</button>  <button onClick={() => setwattotalkedit(false)} className='p-[10px] bg-gray-500'>Cancel</button> </div>  </> :  <>              <div className="wanttotalk flex items-center gap-[10px]">Want To Talk:          <Edit onClick={() => setwattotalkedit(true)}></Edit></div>

<div className="wantotalkbox textwrapped border-2 p-[10px] ">
{userdata.liketotalk}
</div></>}
            </div>
      

                 </div>

              


                 
                 {/* Languages */}

                 <div className='flex flex-col gap-[55px]'>
                    
                        {/* can Teach */}
                    <div className="wanttotalk flex items-center gap-[10px] flex-wrap">Can Teach You: {countries.map((data, id) => 
                    {

                        const allcanspeak = userdata.canspeak.map(data => data.selectedlanguage )

                        if(!allcanspeak.includes(data.name.common)){return ;}


                        return <img key={id} src={data.flags.png} className='w-[35px] h-[35px] rounded-[50%]' alt="" />


                    }


                    )} <Edit onClick={() => setcanteachyouedit(true)}></Edit> </div>

                           {/* Want To Learn */}
                           <div className="wanttotalk flex items-center gap-[10px] flex-wrap">Want To Learn:  {countries.map((data, id) => 
                    {

                        const allcanspeak = userdata.wanttolearn.map(data => data.selectedlanguage )

                        if(!allcanspeak.includes(data.name.common)){return ;}


                        return <img key={id} src={data.flags.png} className='w-[35px] h-[35px] rounded-[50%]' alt="" />


                    }


                    )} <Edit onClick={() => setwanttolearncountriesdropdown(true)}></Edit> </div>


      

                 </div>


                 {canteachyouedit ?
          <div className="countriesselector fixed bg-gray-500/50 ">

            <div className="countriedropdown text-center text-black bg-white flex flex-col gap-[50px] p-[40px] w-[30%]">

             <h1 className='flex items-center justify-between' >Select Language <X className='cursor-pointer ' onClick={() => setwanttolearncountriesdropdown(false)}></X></h1>

             <div className="searcher flex items-center w-[100%] bg-slate-500/100 p-[10px]">

             <input  type="text" className='searchbg w-[95%]' onChange={(e) => setlanguagesearch(e.target.value)} placeholder='Search Language...' />
             <SearchIcon className='text-white' ></SearchIcon>

             </div>


             <div className="customlanguagesdropdown">

             {countries.filter(filt => filt.name.common.toUpperCase().includes(languagesearch.toUpperCase())).map((data, id) => {

               if(!data.flags){
                return;
               }

               return <button onClick={() => canteachyou.map(data => data.selectedlanguage).includes(data.name.common)  ?   setcanteachyou((perv) => perv.filter(filt => filt.selectedlanguage !== data.name.common)) : setcanteachyou((perv) => [...perv , {selectedlanguage:data.name.common}])} key={id} className='w-[100%] p-[20px] bg-gray-200 flex justify-between' ><div className="left flex items-center gap-[25px]"><img width={30} src={data.flags.png} alt="" />

               {data.name.common.slice(0,20)}
               
               </div>  <div className="isselected"> {canteachyou.map(data => data.selectedlanguage).includes(data.name.common) ? <Verified></Verified> :<BoxSelectIcon></BoxSelectIcon>
                }  </div></button>

               

             })}
                  

             </div>

             <div className='flex gap-[15px]  w-[100%]'>
             <button onClick={() => updatecanteachyou() } className='p-[10px] bg-blue-500 text-white'> Update</button>
             <button onClick={() => setcanteachyouedit(false)} className='p-[10px] bg-gray-500 text-white'> Cancel</button>
             </div>

    
            </div>
            

          </div>

          : null}

                 {wanttolearncountriesdropdown ?
          <div className="countriesselector fixed bg-gray-500/50 ">

            <div className="countriedropdown text-center text-black bg-white flex flex-col gap-[50px] p-[40px] w-[30%]">

             <h1 className='flex items-center justify-between' >Select Language <X className='cursor-pointer ' onClick={() => setwanttolearncountriesdropdown(false)}></X></h1>

             <div className="searcher flex items-center w-[100%] bg-slate-500/100 p-[10px]">

             <input  type="text" className='searchbg w-[95%]' onChange={(e) => setlanguagesearch(e.target.value)} placeholder='Search Language...' />
             <SearchIcon className='text-white' ></SearchIcon>

             </div>


             <div className="customlanguagesdropdown">

             {countries.filter(filt => filt.name.common.toUpperCase().includes(languagesearch.toUpperCase())).map((data, id) => {

               if(!data.flags){
                return;
               }

               return <button onClick={() => wanttolearn.map(data => data.selectedlanguage).includes(data.name.common)  ?   setwanttolearn((perv) => perv.filter(filt => filt.selectedlanguage !== data.name.common)) : setwanttolearn((perv) => [...perv , {selectedlanguage:data.name.common}])} key={id} className='w-[100%] p-[20px] bg-gray-200 flex justify-between' ><div className="left flex items-center gap-[25px]"><img width={30} src={data.flags.png} alt="" />

               {data.name.common.slice(0,20)}
               
               </div>  <div className="isselected"> {wanttolearn.map(data => data.selectedlanguage).includes(data.name.common) ? <Verified></Verified> :<BoxSelectIcon></BoxSelectIcon>
                }  </div></button>

               

             })}
                  

             </div>

             <div className='flex gap-[15px]  w-[100%]'>
             <button onClick={() => updatewanttolearn() } className='p-[10px] bg-blue-500 text-white'> Update</button>
             <button onClick={() => setwanttolearncountriesdropdown(false)} className='p-[10px] bg-gray-500 text-white'> Cancel</button>
             </div>

    
            </div>

          </div>

          : null}
                 <br /><br />


                 











         </div>


    </div>
   </div>
  )
}
