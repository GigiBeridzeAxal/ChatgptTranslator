
import fs from 'fs';
import path from 'path';

import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function POST(req,res) {

    const body = req.json()


    const dirpath = path.join(process.cwd() , 'images')
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomname = () => {
        let random = ''
        for (let index = 0; index < 16; index++) {

            random += characters.charAt(Math.floor(Math.random() * characters.length))
            
            
            
        }

        return random
    }


    console.log(randomname())

    

    const filedir = path.join(dirpath , `${randomname()}.txt`)


    if(!fs.existsSync(dirpath)){
        fs.mkdirSync(dirpath)
    }

    fs.writeFileSync(filedir , "hello world")

    return new NextResponse(randomname() , {status:200})

}