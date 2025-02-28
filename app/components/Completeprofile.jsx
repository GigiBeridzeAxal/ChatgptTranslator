'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { BoxSelect, Database, File, Languages, SearchIcon, Upload, UploadCloud, UploadCloudIcon, Verified, X } from 'lucide-react'
import toast from 'react-hot-toast'
import './compleate.css'

export default function Completeprofile() {

    const [uploadedpic , setuploadedpic] = useState(0)
    const [base64 , setbase64] = useState()
    const [countries , setcountries] = useState([])
    const [next , setnext] = useState(0)
    const [wanttotalk , setwanttotalk] = useState()
    const [canspeakcountriesropdown , setcanspeakcountriesropdown] = useState(false)
    const [aboutme , setaboutme] = useState() 
    const [languagesearch , setlanguagesearch] = useState('')
    const [selectedlanguage , setselectedlanguage] = useState([
 

]) 
    const [wanttolearn , setwanttolearn] = useState([ 
])
    const [wanttolearncountriesdropdown , setwanttolearncountriesdropdown] = useState(false)
  
    const {userinfo} = useAuth()

    useEffect(() => {

        const getc = async () => {

            const getcountries = await axios.get('https://restcountries.com/v3.1/all')
            setcountries(getcountries.data)
            console.log(getcountries.data)

        }
        getc()

    },[])


    const AddnewLanguage = () => {

        setselectedcountrie((perv) => [...perv , {     selectedlanguage:false,
            dropdown:false}])


    }
    const removechildfromselectedlanguage= (id) => {
        setselectedlanguage(perv => perv.filter((data ,index) => index !== id ))

    }
    const removechildfromwantlearn = (id) => {
        setwanttolearn(perv => perv.filter((data ,index) => index !== id ))

    }

    
    const AddnewLanguageforwanttolearn = () => {

        setwanttolearn((perv) => [...perv , {     selectedlanguage:false,
            dropdown:false}])


    }



    const Finish = async() => {
        const formdata = new FormData()
        formdata.append('image' , uploadedpic)
        formdata.append('email' , userinfo.email)

     //  const uploadimageindir = await axios.post('/api/uploadimage' , formdata , {headers:{'Content-Type':'multipart/form-data'}})




   
        const setprofilepic = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "changeprofilepic" , formdata , {
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })
        const changecanspeaklanguages = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "changecanspeak" , {canspeak:selectedlanguage , email:userinfo.email})
        const changewanttolearn = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "changewanttolearn" , {wanttolearn:wanttolearn , email:userinfo.email})
        const changeabout = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "changeabout" , {about:aboutme , email:userinfo.email})
        const liketotalk = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "liketotalk" , {liketotalk:wanttotalk , email:userinfo.email})

       if(setprofilepic.status == 200){
            window.location = '/'
        }



      

    }

    const changepicture = (e) => {
        const reader = new FileReader()

        reader.readAsDataURL(e.target.files[0])


        reader.onload  = () => {
            setuploadedpic(e.target.files[0])
            setbase64(reader.result)
        }
    }


  return (
    <div className="compleateprofile  w-[100%] h-[100vh] flex items-center justify-center ">
        <div className="compleateprofileframe flex flex-col gap-[75px] items-center justify-center">

            {next === 0 ? 
            <div className="compleateform p-[20px] w-[500px] h-[500px] bg-white">
                
                <div className="details text-black">
                   <h1 className=' flex items-center gap-[15px]'><UploadCloudIcon className='size-[55px] p-[10px] h-[55px] text-gray-800 rounded-[50%] bg-gray-200'></UploadCloudIcon> Upload Your Profile Picture  </h1>
                   <br />

                   <div className="lines flex gap-[5px] w-[100%]">
                    <div className="line h-[2px] w-[33.3%] bg-blue-500"></div>
                    <div className="line h-[2px] w-[33.3%] bg-gray-200"></div>
                    <div className="line h-[2px] w-[33.3%] bg-gray-200"></div>
                   </div>
                   <div className="sections text-[14px] mt-[5px] flex w-[100%] justify-between">
                        <h3 className='w-[33.3%] text-blue-500' >Picture</h3>
                        <h3  className='w-[33.3%]'>About Me</h3>
                        <h3  className='w-[33.3%]'>Langauges</h3>
                    </div>
                </div>

                <div className="uploader flex items-center justify-center w-[100%] h-[300px]">

                   <input onChange={(e) => changepicture(e)} type="file" id='uploaderfile' className='hidden' />

                   <label htmlFor="uploaderfile" className="uploaderline w-[100%] h-[250px] flex items-center justify-center">
                   {base64 ? <img width={150} height={150} src={base64} alt="" /> : <label htmlFor=""><Upload className='text-black size-[50px]' ></Upload></label> } 
                   </label>
         

                </div>

                <div className="buttons gap-[15px] flex w-[100%] justify-end">
                <button className='bg-gray-500 p-[7px] text-gray-300 w-[80px] rounded-[2px]'>Back</button> 
                {base64 ?        <button onClick={() => setnext(1)} className='bg-blue-500 p-[7px] w-[80px] rounded-[2px]'>Next</button> :        <button className='bg-blue-500 p-[7px] w-[80px] text-gray-300 rounded-[2px]'>Next</button> }
             
                </div>


            </div>
                   : null}

                   
            {next === 1 ? 
            <div className="compleateform p-[20px] w-[500px] h-[620px] bg-white">
                
                <div className="details text-black">
                   <h1 className=' flex items-center gap-[15px]'><File className='size-[55px] p-[10px] h-[55px] text-gray-800 rounded-[50%] bg-gray-200'></File> Tell Us More About You </h1>
                   <br />

                   <div className="lines flex gap-[5px] w-[100%]">
                    <div className="line h-[2px] w-[33.3%] bg-teal-500"></div>
                    <div className="line h-[2px] w-[33.3%] bg-blue-500"></div>
                    <div className="line h-[2px] w-[33.3%] bg-gray-200"></div>
                   </div>
                   <div className="sections text-[14px] mt-[5px] flex w-[100%] justify-between">
                        <h3 className='w-[33.3%] text-teal-500' >Picture</h3>
                        <h3  className='w-[33.3%]  text-blue-500'>About Me</h3>
                        <h3  className='w-[33.3%]'>Langauges</h3>
                    </div>
                </div>

   
                <div className="w-[100%] h-[400px] mt-[35px]">
                <h3 className='text-black text-[14px] p-[5px]'>Tell Us More About You</h3>
                    <textarea value={aboutme} maxLength={240} onChange={(e) => setaboutme(e.target.value) } className='bg-gray-100 text-black p-[10px] w-[100%] h-[150px]' placeholder='Tell Us More About You...' name="" id=""></textarea>
                    <div className="lengthleft text-black text-[13px] text-end">{ aboutme ? 240 - aboutme.length : 240} Character Left</div>
                    <h3 className='text-black text-[14px] mt-[15px] p-[5px]'>Tell Us What You Like To Talk</h3>
                    <textarea value={wanttotalk} maxLength={100} onChange={(e) => setwanttotalk(e.target.value) } className='bg-gray-100 text-black p-[10px] w-[100%] h-[100px]' placeholder='Tell Us What You Like To Talk...' name="" id=""></textarea>
                    <div className="lengthleft text-black text-[13px] text-end">{ wanttotalk ? 100 - wanttotalk.length : 100} Character Left</div>
                </div>

           
                <div className="buttons gap-[15px] flex w-[100%] justify-end">
                <button  onClick={() => setnext(perv=> perv - 1)} className='bg-gray-500 p-[7px]  w-[80px] rounded-[2px]'>Back</button> 
                { !wanttotalk || !aboutme  ?   <button className='bg-blue-500 p-[7px] w-[80px] text-gray-300 rounded-[2px]'>Next</button>  :   <button onClick={() => setnext(2)} className='bg-blue-500 p-[7px] w-[80px] rounded-[2px]'>Next</button> }
             
                </div>


            </div>
                   : null}

                          
            {next === 2 ? 
            <div className="compleateform p-[20px] w-[500px] h-[620px] bg-white">
                
                <div className="details text-black">
                   <h1 className=' flex items-center gap-[15px]'><Languages className='size-[55px] p-[10px] h-[55px] text-gray-800 rounded-[50%] bg-gray-200'></Languages> Select Langauges </h1>
                   <br />

                   <div className="lines flex gap-[5px] w-[100%]">
                    <div className="line h-[2px] w-[33.3%] bg-teal-500"></div>
                    <div className="line h-[2px] w-[33.3%] bg-teal-500"></div>
                    <div className="line h-[2px] w-[33.3%] bg-blue-500"></div>
                   </div>
                   <div className="sections text-[14px] mt-[5px] flex w-[100%] justify-between">
                        <h3 className='w-[33.3%] text-teal-500' >Picture</h3>
                        <h3  className='w-[33.3%] text-teal-500'>About Me</h3>
                        <h3  className='w-[33.3%] text-blue-500'>Langauges</h3>
                    </div>
                </div>

   
                <div className="w-[100%] text-black h-[400px] mt-[35px]">

                {wanttolearncountriesdropdown ?
          <div className="countriesselector bg-gray-500/50 ">

            <div className="countriedropdown text-center text-black bg-white flex flex-col gap-[50px] p-[40px] w-[30%]">

             <h1 className='flex items-center justify-between' >Select Language <X className='cursor-pointer ' onClick={() => setwanttolearncountriesdropdown(false)}></X></h1>

             <div className="searcher flex items-center w-[100%] bg-slate-500/100 p-[10px]">

             <input  type="text" className='searchbg w-[95%]' onChange={(e) => setlanguagesearch(e.target.value)} placeholder='Search Language...' />
             <SearchIcon className='text-white' ></SearchIcon>

             </div>


             <div className="customlanguagesdropdown">

             {countries.filter(filt => filt.name.common.toUpperCase().includes(languagesearch.toUpperCase())).map((data, id) => {

            console.log(data)

               return <button onClick={() => wanttolearn.map(data => data.selectedlanguage).includes(data.name.common) ? toast.error("Already Choosed") : setwanttolearn((perv) => [...perv , {selectedlanguage:data.name.common}])} key={id} className='w-[100%] p-[20px] bg-gray-200 flex justify-between' ><div className="left flex items-center gap-[25px]"><img width={30} src={data.flags.png} alt="" />

               {data.name.common.slice(0,20)}
               
               </div>  <div className="isselected"> {wanttolearn.map(data => data.selectedlanguage).includes(data.name.common) ? <Verified></Verified> :<BoxSelect></BoxSelect>
                }  </div></button>

             })}

             </div>

            </div>


          </div>
          : null}
                {canspeakcountriesropdown ?
          <div className="countriesselector  bg-gray-500/50 " onClick={() => console.log("Clice")}>

            <div className="countriedropdown text-center text-black bg-white flex flex-col gap-[50px] p-[40px] w-[30%]">

             <h1 className='flex items-center justify-between' >Select Language <X className='cursor-pointer ' onClick={() => setcanspeakcountriesropdown(false)}></X></h1>

             <div className="searcher flex items-center w-[100%] bg-slate-500/100 p-[10px]">

             <input  type="text" className='searchbg w-[95%]' onChange={(e) => setlanguagesearch(e.target.value)} placeholder='Search Language...' />
             <SearchIcon className='text-white' ></SearchIcon>

             </div>


             <div className="customlanguagesdropdown">

             {countries.filter(filt => filt.name.common.toUpperCase().includes(languagesearch.toUpperCase())).map((data, id) => {

            console.log(data)

               return <button onClick={() => selectedlanguage.map(data => data.selectedlanguage).includes(data.name.common) ? toast.error("Already Choosed") : setselectedlanguage((perv) => [...perv , {selectedlanguage:data.name.common}] )} key={id} className='w-[100%] p-[20px] bg-gray-200 flex justify-between' ><div className="left flex items-center gap-[25px]"><img width={30} src={data.flags.png} alt="" />

               {data.name.common.slice(0,20)}
               
               </div>  <div className="isselected"> {selectedlanguage.map(data => data.selectedlanguage).includes(data.name.common) ? <Verified></Verified> :<BoxSelect></BoxSelect>
                }  </div></button>

             })}

             </div>

            </div>


          </div>
          : null}

             <div className="canspeaklangaugesframe">
             <div className="canspeaklanguages ">
                        Can Speak: <div className="languagelist bg-gray-200/50 p-[10px] flex gap-[10px] items-start flex-wrap ">{selectedlanguage[0] ? selectedlanguage.map((data ,id) => <button onClick={() => removechildfromselectedlanguage(id)}  key={id} className='text-blue-700' >{data.selectedlanguage}</button>) : "Choose languages You Already Can Speak" }</div>
                        <br />

                        <button onClick={() => setcanspeakcountriesropdown(true)} className="canspeadropdownbutton bg-blue-500 text-white p-[10px]">

                            Select Langauges

                        </button>

                    </div>
                    <br /><br />
                    <div className="canspeaklanguages ">
                        Want To learn: <div className="languagelist bg-gray-200/50 p-[10px] flex gap-[10px] items-start flex-wrap ">  {wanttolearn[0] ? wanttolearn.map((data ,id)  => <button key={id} className='text-blue-700' onClick={() => removechildfromwantlearn(id)} >{data.selectedlanguage}</button> ) : "Choose Languages You can Want To Learn" } </div>
        <br />

                        <button onClick={() => setwanttolearncountriesdropdown(true)} className="canspeadropdownbutton bg-blue-500 text-white p-[10px]">

                            Select Langauges

                        </button>

                    </div>
             </div>

              
              
              
                </div>
                

           
                <div className="buttons fixedbtns bg-white p-[10px] gap-[15px] flex w-[100%] justify-end">
                <button  onClick={() => setnext(perv=> perv - 1)} className='bg-gray-500 p-[7px]  w-[80px] rounded-[2px]'>Back</button> 
                { !selectedlanguage[0] || !wanttolearn[0]  ?   <button className='bg-blue-500 p-[7px] w-[80px] text-gray-300 rounded-[2px]'>Finish</button>  :   <button onClick={() => Finish()} className='bg-blue-500 p-[7px] w-[80px] rounded-[2px]'>Finish</button> }
             
                </div>


            </div>
                   : null}

        </div>
    </div>
  )
} 

