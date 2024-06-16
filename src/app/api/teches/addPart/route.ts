import dbConnet from "@/lib/db"
import Tech from '@/models/tech'
import { NextRequest, NextResponse } from "next/server"



export async function POST(req:NextRequest, res:any){
    await dbConnet()

    try{
        const {id, name, catagory, serialNumber, sellNumber, count, sum, nameContact, linkContact, manufacturer}  = await req.json()
        
        let part = {
            name: name,
            catagory: catagory,
            serialNumber: serialNumber,
            sellNumber: sellNumber,
            manufacturer:manufacturer,
            count: count,
            sum:sum,
            contact:{
                name: nameContact,
                link: linkContact
            }

        }
        
        
        const data = await Tech.findOneAndUpdate({id:id},{$push:{parts:part}})

       
        return NextResponse.json({message:'Запчасть добавлена', data:data})
    }
    catch(e:any){
        return NextResponse.json(e.message)
    }
}