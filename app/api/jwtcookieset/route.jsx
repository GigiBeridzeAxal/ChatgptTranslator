import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function POST(req,res) {
    const body = await req.json()

    ;(await cookies()).set('JWT' , body.jwt)
    
    return new Response('Ok' , {
        status:200
    })
}