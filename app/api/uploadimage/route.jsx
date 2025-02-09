
import fs from 'fs';
import path from 'path';

import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function POST(req,res) {

    const body = await req.json()


    const dirpath = path.join('/tmp' , 'images' , )
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let randomname = () => {
        let random = ''
        for (let index = 0; index < 16; index++) {

            random += characters.charAt(Math.floor(Math.random() * characters.length))
            
            
            
        }

        return random
    }


    let random = randomname()

    

    const filedir = path.join(dirpath , `${random}.txt`)


    if(!fs.existsSync(dirpath)){
        fs.mkdirSync(dirpath , { recursive: true })
    }

    fs.writeFileSync(filedir , body.image)
    

    return new NextResponse(random , {status:200})

}