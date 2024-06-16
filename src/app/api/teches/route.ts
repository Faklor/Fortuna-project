import dbConnet from "@/lib/db"
import Tech from '@/models/tech'
import { NextRequest, NextResponse } from "next/server"

export async function GET(){
    await dbConnet()


    try{
        const tech = await Tech.find({})
       
        return NextResponse.json(tech)
    }
    catch(e:any){
        return NextResponse.json(e.message)
    }
   
}

export async function POST(req:NextRequest, res:any){
    await dbConnet()

    try{
        const {id}  = await req.json()
        

        const tech = await Tech.findOne({id:id})

        return NextResponse.json(tech)
    }
    catch(e:any){
        return NextResponse.json(e.message)
    }
}