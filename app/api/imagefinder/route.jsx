import { NextResponse } from "next/server"
import fs from 'fs'
import path from "path"




export async function POST(req) {

    const body = await req.json()
    let profile = ''


    const dirpath = path.join(process.cwd() , 'images')
    if(fs.existsSync(dirpath)){

         const filedir = path.join(dirpath , `${body.imagename}.txt`)

        profile = fs.readFileSync(filedir , 'utf-8')

    }

    return new NextResponse(profile , {status:200})


    
}