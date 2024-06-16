import dbConnet from "@/lib/db"
import Tech from '@/models/tech'
import { NextResponse } from "next/server"
import fs from 'fs'

export async function GET(){
    //await dbConnet()


    try{
       
        let arrayImg:object[] = []
        //const name = 'bodyCar.svg'

        let files = fs.readdirSync('./public/categoryes')
        files.forEach(file => {
            // if(file === name){
            //     a = fs.readFileSync(`./src/res/categoryes/${file}`)
            // }
            let text = file.split('.')[0]
            arrayImg.push({title:text,file:file}) 
        })

        // b().then(res=>{
        //     console.log(res)
        // })
        

        //console.log(a)

        return NextResponse.json(arrayImg)
    }
    catch(e:any){
        return NextResponse.json(e.message)
    }
   
}

