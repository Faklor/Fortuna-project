import dbConnet from "@/lib/db"
import Tech from '@/models/tech'
import { NextRequest, NextResponse } from "next/server"



export async function POST(req:NextRequest, res:any){
    await dbConnet()

    try{
        const {id, index_of_part}  = await req.json()
        
        //const data = await Tech.findOneAndDelete({id:id})
        const data = await Tech.findOneAndUpdate({id:id},{$unset:{[`parts.${index_of_part}`]:1}},{ multi: true })

       
        return NextResponse.json({message:'Запчасть удалена', data:data})
    }
    catch(e:any){
        return NextResponse.json(e.message)
    }
}