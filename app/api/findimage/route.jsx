import path, { join } from 'path'
import fs from 'fs'
export async function GET(req,res) {

    const { imageName } = req.query;

    const imagepath = join('/tmp' , imageName)

    if(fs.existsSync(imagepath)){
        const buffer = fs.readFileSync(imagepath)
        res.setHeader('Content-Type', 'image/png');
        res.status(200).send(buffer)
    }else{
        res.status(201).send("Not Found")
    }



}
