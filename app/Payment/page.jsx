'use client'
import React, { Suspense, useEffect } from 'react'
import DashHeader from '../dashboard/components/DashHeader'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import '../Payment/Payment.css'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { Verified } from 'lucide-react'
import axios from 'axios'
import { useAuthStore } from '../store/useAuthStore'
import { useSearchParams } from 'next/navigation'

const Checkout = () => {

    const {checkauth , Authuser} = useAuthStore()
    const searchparams = useSearchParams()

    const plan = searchparams.get('plan')

    const giveuserpremium = async() => {
        
        try{
            
            const premium = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "PlanPurcashe" , {userid:Authuser.id , plan:plan})
          toast.success("Transaction completed by " + details.payer.name.given_name);
    }catch(err){

        }

    }

    
    useEffect(() => {
        console.log(plan)
        checkauth()
    },[])


  return (

    <>

<br /><br />
     <div className="payment w-[100%] h-[100vh] flex items-center justify-center">
        <div className="paymentheader  w-[70%] flex items-center justify-around ">
            <div className="leftpaymentinfo">

            <div className="plans   h-[100vh]  flex items-center justify-center w-[100%]">
        <div className="plansframe ">

            <div className="premiumplan  flex flex-col rounded-[3px]  bg-white text-black gap-[10px] p-[30px]">
                <h1 className='text-black text-[22px] premiumtittle premiumplantittle' >Premium</h1>

                <div className="startsat">Starts at</div>

                <div className="price text-[22px] flex items-center gap-[10px]" ><div className="s text-[44px]">$15</div> per month/user</div>

                <div className="desca text-gray-600">You can use Premium to perform your activities better and faster</div>

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

            </div>
            <div className="rightpayment bg-white p-[30px] rounded-[5px]">
                <h1 className='text-[24px] text-black' >Choose Payment Method</h1>
                <br />
                <PayPalScriptProvider options={{ clientId: "AX8henYPxNm_eJySlM7reSI2Xpmkm3oo_HqIIMpPxWfXDGFtp771BMR3V53jI0NslFlMZxiJFgVfuSl3" }}>
  <PayPalButtons
    createOrder={(data, actions) => {
      console.log("Clicked");
      return actions.order.create({
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "2.00",
            },
          },
        ],
      }).catch((error) => console.error("Order creation failed:", error));
    }}
    onApprove={(data, actions) => {
      return actions.order.capture()
        .then((details) => {
          toast.loading("Please Wait While We Redirect You");

          try {
            giveuserpremium();
          } catch (error) {
            console.error("Error in giveuserpremium:", error);
          }

          window.location = '/';
        })
        .catch((error) => {
          console.error("Payment failed:", error);
        });
    }}
  />
</PayPalScriptProvider>
            </div>
           

        </div>
     </div>
    </>
 
  )
}


export default function page() {
  return (
    <Suspense fallback="Loading..">
        <Checkout></Checkout>
    </Suspense>
  )
}
