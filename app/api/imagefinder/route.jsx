import { NextResponse } from "next/server"
import fs from 'fs'
import path from "path"

export async function POST(req) {
    const body = await req.json()
    let profile = ''

    const dirpath = path.join('/tmp', 'images')

    try {
        // Check if the directory exists
        if (fs.existsSync(dirpath)) {
            const filedir = path.join(dirpath, `${body.imagename}.txt`)

            // Check if the file exists before reading it
            if (fs.existsSync(filedir)) {
                // Read the file synchronously
                profile = await fs.readFileSync(filedir, 'utf-8')
            } else {
                // If file doesn't exist, return a message
                return new NextResponse('File not found', { status: 404 })
            }
        } else {
            // If directory doesn't exist, return a message
            return new NextResponse('Directory not found', { status: 404 })
        }

        // Return the content of the profile if file was successfully read
        return new NextResponse(profile, { status: 200 })

    } catch (error) {
        // Log any errors that happen during the process
        console.error('Error reading file:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
