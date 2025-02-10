import fs from 'fs';
import { NextResponse } from 'next/server';
import path, { join } from 'path';

export async function GET(req, res) {
    // Extract image name from the query parameters or request
    const searchparams = req.nextUrl.searchParams
    const image = searchparams.get('image')

    const imagepath = join('/tmp' , "dl4PUMGnrJaCs4jo.png" )

    const imagebuffer = fs.readFileSync(imagepath)



    return new NextResponse(imagebuffer)


}
