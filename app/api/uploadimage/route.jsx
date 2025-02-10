
import fs, { mkdir, mkdirSync, writeFile, writeFileSync } from 'fs';
import path, { join } from 'path';

import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function POST(req,res) {

    const formdata = await req.formData()
    const file = formdata.get('file')

    console.log(file)


    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let randomname = () => {
        let random = ''
        for (let index = 0; index < 16; index++) {

            random += characters.charAt(Math.floor(Math.random() * characters.length))
            
            
            
        }

        return random
    }


    let random = randomname()


    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const dirpath = join('/tmp', 'tmp')
    

 //  const filedir = path.join(dirpath , `${random}.txt`)

    const path = join(dirpath, random + '.png')
     mkdirSync(dirpath , {recursive:true})
     writeFileSync(path , buffer)
     



    return new NextResponse(random + '.png' , {status:200})

}