import dbConnet from "@/lib/db"
import Tech from '@/models/tech'
import { NextRequest, NextResponse } from "next/server"



export async function POST(req:NextRequest, res:any){
    await dbConnet()

    try{
        const {id, date, worker, part}  = await req.json()
        
        let order = {
            date:date,
            worker:worker,
            part:part
        }
        
        
        
        const data = await Tech.findOneAndUpdate({id:id},{$push:{orders:order}})
       
        
        //const old_data = await Tech.findOne({id:id})
        
        let old_count = 0

        if(data){
            data.parts.forEach((item:any,index:number)=>{
                if(index === part.index){
                    old_count = item.count
                }

            })

        }
        
        const new_data = await Tech.findOneAndUpdate({id:id},{$set:{[`parts.${part.index}.count`]:old_count - part.count}})

        
       
        return NextResponse.json({message:'Запчасть выдана', data:data})
    }
    catch(e:any){
        return NextResponse.json(e.message)
    }
}