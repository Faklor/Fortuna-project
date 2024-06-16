import dbConnet from "@/lib/db"
import Tech from '@/models/tech'
import { NextRequest, NextResponse } from "next/server"



export async function POST(req:NextRequest, res:any){
    await dbConnet()

    try{
        let {id, index_of_part, count}  = await req.json()
        
        
        //console.log(index_of_part)
        
        
        const data = await Tech.findOneAndUpdate({id:id},{$set:{[`parts.${index_of_part}.count`]:count+1}})

       
        return NextResponse.json({message:'Запчасть обналена на +1 шт.'})
    }
    catch(e:any){
        return NextResponse.json(e.message)
    }
}