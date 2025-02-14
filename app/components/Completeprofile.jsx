'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'

export default function Completeprofile() {

    const [uploadedpic , setuploadedpic] = useState(0)
    const [base64 , setbase64] = useState()
    const [countries , setcountries] = useState([])
    const [next , setnext] = useState(0)
    const [wanttolearn , setwanttolearn] = useState([
        {
            selectedlanguage:false,
            dropdown:false
        }
    ])
    const [selectedcountries , setselectedcountrie] = useState([
        {
            selectedlanguage:false,
            dropdown:false
        }
    ])
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

    
    const AddnewLanguageforwanttolearn = () => {

        setwanttolearn((perv) => [...perv , {     selectedlanguage:false,
            dropdown:false}])


    }



    const Finish = async() => {
        const formdata = new FormData()
        formdata.append('file' , uploadedpic)

     //  const uploadimageindir = await axios.post('/api/uploadimage' , formdata , {headers:{'Content-Type':'multipart/form-data'}})




   
        const setprofilepic = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "changeprofilepic" , {image:base64 , email:userinfo.email})
        const changecanspeaklanguages = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "changecanspeak" , {canspeak:selectedcountries , email:userinfo.email})
        const changewanttolearn = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "changewanttolearn" , {wanttolearn:wanttolearn , email:userinfo.email})

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
    <div className="compleateprofile w-[100%] h-[100vh] flex items-center justify-center ">
        <div className="compleateprofileframe flex flex-col gap-[75px] items-center justify-center">

            {next === 0 ?<>
                <div className="process hidden flex items-center justify-center gap-[50px] font-[500]">
                <div className="completer">Profile Picture</div>
                <div className="completer text-gray-300">Select Language</div>
            </div>

            <div className="processtittle text-[26px] text-gray-600 font-[300]">Choose Your Profile Picture</div>


            <input onChange={(e) => changepicture(e)}  className='hidden' type="file" name="" id="uploadpic" />
            <label  htmlFor="uploadpic"><div style={uploadedpic !== 0 ? {backgroundImage:`url(${base64})`} : null}  className="profileuploader">{uploadedpic !== 0 ?  null: <div className="clickheretoupload">Click Here to Upload</div> }</div> </label>

   
        </> : null}

        {next === 1 ? <>
                                      <div className="process hidden flex items-center justify-center gap-[10px] font-[500]">
                <div className="completer">Profile Picture</div>
                <div className="completer text-gray-300">Select Language</div>
            </div>

            <div className="processtittle text-[22px] text-gray-600 font-[300]">Select Languages You Can Speak</div>

       



                <div className="allslider flex flex-col w-[90%] gap-[20px]">
                {selectedcountries.map((data , id) => 
     <div onClick={() => setselectedcountrie(perv => perv.map((pervdata ,pervid) => {


        if(pervid == id){
            if(pervdata.dropdown == false){
                return {...pervdata , dropdown:true}
            }else{
                return {...pervdata , dropdown:false}
            }
    
        }else{
            return {...pervdata , dropdown:false}
        }

     
        

     }) )}key={id} className="customselector  relative">

        {data.selectedlanguage == false ? <div className="selectlang flex items-center justify-between">Select Language {data.dropdown == true ?  <img width={20} src="Collapse.png" alt="" /> :  <img width={20} src="Expand.png" alt="" /> }</div> : <div className='flex justify-between items-center'><div className="left flex items-center gap-[10px]">{data.selectedlanguage}  <img width={20} src={countries.find(name => name.name.common === data.selectedlanguage).flags.png } alt="" /> </div> {data.dropdown == true ?  <img width={20} src="Collapse.png" alt="" /> :  <img width={20} src="Expand.png" alt="" /> } </div>} 
               
                
     {data.dropdown == true ? <div  className="dropdown flex flex-col gap-[5px]">
    {countries.map((data ,ider) => (<button onClick={() => setselectedcountrie(perv => perv.map((pervdata ,pervid) => {
        
        if(pervid == id ){
            
       
                return {...pervdata , selectedlanguage:data.name.common}
      
    
        }else{
            return pervdata
        }


    }))} className='flex items-center gap-[15px]' key={ider} value={data.name.official} >{data.name.common} <img width={20} src={data.flags.png} alt="" /></button>))}
      </div>  : null}
                
              
      </div>

                )}
              
                    
                </div>
             
                   
           

       
            <div onClick={() => AddnewLanguage()} className="addbutton bg-teal-500 text-white p-[7px]">Add New</div>

           
</>  : null}


{next === 2 ? <>
                                      <div className="process hidden flex items-center justify-center gap-[10px] font-[500]">
                <div className="completer">Profile Picture</div>
                <div className="completer text-gray-300">Select Language</div>
            </div>

            <div className="processtittle text-[22px] text-gray-600 font-[300]">Select Languages You Want To Learn</div>

       



                <div className="allslider flex flex-col w-[90%] gap-[20px]">
                {wanttolearn.map((data , id) => 
     <div onClick={() => setwanttolearn(perv => perv.map((pervdata ,pervid) => {


        if(pervid == id){
            if(pervdata.dropdown == false){
                return {...pervdata , dropdown:true}
            }else{
                return {...pervdata , dropdown:false}
            }
    
        }else{
            return {...pervdata , dropdown:false}
        }

     
        

     }) )}key={id} className="customselector  relative">

        {data.selectedlanguage == false ? <div className="selectlang flex items-center justify-between">Select Language {data.dropdown == true ?  <img width={20} src="Collapse.png" alt="" /> :  <img width={20} src="Expand.png" alt="" /> }</div> : <div className='flex justify-between items-center'><div className="left flex items-center gap-[10px]">{data.selectedlanguage}  <img width={20} src={countries.find(name => name.name.common === data.selectedlanguage).flags.png } alt="" /> </div> {data.dropdown == true ?  <img width={20} src="Collapse.png" alt="" /> :  <img width={20} src="Expand.png" alt="" /> } </div>} 
               
                
     {data.dropdown == true ? <div  className="dropdown flex flex-col gap-[5px]">
    {countries.map((data ,ider) => (<button onClick={() => setwanttolearn(perv => perv.map((pervdata ,pervid) => {
        
        if(pervid == id ){
            
       
                return {...pervdata , selectedlanguage:data.name.common}
      
    
        }else{
            return pervdata
        }


    }))} className='flex items-center gap-[15px]' key={ider} value={data.name.official} >{data.name.common} <img width={20} src={data.flags.png} alt="" /></button>))}
      </div>  : null}
                
              
      </div>

                )}
              
                    
                </div>
             
                   
           

       
            <div onClick={() => AddnewLanguageforwanttolearn()} className="addbutton bg-teal-500 text-white p-[7px]">Add New</div>

           
</>  : null}




{next == 0 ?            uploadedpic !== 0 ?             <button onClick={() => setnext(1)} className="next bg-blue-500 rounded-[2px] text-white p-[10px] text-white w-[150px]">Next</button> : 
                           <button  className="next bg-gray-400 text-gray-500 p-[10px] rounded-[2px] text-gray-700 w-[150px]">Next</button>  : null}

{next == 1 ?            selectedcountries[0].selectedlanguage !== false ?             <button onClick={() => setnext(2)} className="next bg-blue-500 rounded-[2px] text-white p-[10px] text-white w-[150px]">Next</button> : 
                           <button  className="next bg-gray-400 text-gray-500 p-[10px] rounded-[2px] text-gray-700 w-[150px]">Next</button>  : null}
                           
{next == 2 ? wanttolearn[0].selectedlanguage !== false ?             <button onClick={() => Finish()} className="next bg-blue-500 rounded-[2px] text-white p-[10px] text-white w-[150px]">Finish</button> : 
                           <button  className="next bg-gray-400 text-gray-500 p-[10px] rounded-[2px] text-gray-700 w-[150px]">Finish</button>  : null}
        </div>
    </div>
  )
} 

