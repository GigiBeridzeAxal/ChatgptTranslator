import React from 'react'
import DashHeader from '../dashboard/components/DashHeader'
import { Verified } from 'lucide-react'

export default function page() {
  return (
    <>
    <DashHeader></DashHeader>

    <div className="plans pt-[100px]  h-[100vh]  flex items-center justify-center w-[100%]">
        <div className="plansframe ">

            <div className="premiumplan  flex flex-col rounded-[3px]  bg-white text-black gap-[10px] p-[30px]">
                <h1 className='text-black text-[22px] premiumtittle premiumplantittle' >Premium</h1>

                <div className="startsat">Starts at</div>

                <div className="price text-[22px] flex items-center gap-[10px]" ><div className="s text-[44px]">$15</div> per month/user</div>

                <div className="desc text-gray-600">You can use Premium to perform your activities better and faster</div>

                <button className='w-[100%] mt-[10px] p-[10px] bg-blue-500 rounded-[3px] text-white'>Get Started</button>
<br />
                <hr />

                <div className="features">
                    <h1>Premium Plan Features :</h1>
                    <div className="list pt-[15px] flex flex-col gap-[10px]">
                    <div className=" flex items-center gap-[5px]"> <Verified></Verified> No Ads</div>
                    <div className="  flex items-center gap-[5px]"> <Verified></Verified> 1500 credits</div>
                    </div>

                </div>
            </div>



        </div>
    </div>


    </>
  )
}
