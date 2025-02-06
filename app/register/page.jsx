import React from 'react'

export default function page() {
  return (
    <div className="register w-[100%] h-[100vh] flex items-center justify-center">
      <div className="registerframe">
        <form className='authform flex flex-col items-center gap-[15px] ' >


          <h1 className='text-[24px]' >Sign Up With</h1>
          <br />

          <div className="google">Countiniue With Google</div>

          <div className="line flex w-[100%] justify-center gap-[10px] items-center">
            <div className="line1 w-[120px] h-[1px] bg-black "></div>
            Sign Up
            <div className="line1 w-[120px] h-[1px] bg-black "></div>
          </div>
          

          <input type="text" placeholder='Enter Your Email' />

          <input type="text" placeholder='Enter Your First Name' />
          
          <input type="text" placeholder='Enter Your Last Name' />

          <input type="text" placeholder='Enter Your Password' />

          <button className='w-[320px] p-[6px] bg-teal-500 text-white ' >Sign Up</button>

          <div className="alreadyhaveaccount flex items-center justify-center gap-[5px]">Already Have Account ? <a className='text-blue-500' href="/login">Click Here</a></div>

        </form>
      </div>
    </div>
  )
}
