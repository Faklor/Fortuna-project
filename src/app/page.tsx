'use client'
import './page.scss'
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from 'next/navigation'
//-------res----------------------
import user from '@/res/user.svg'
//===logo====
import logo from '@/res/titlePage/fortuna.svg'
//===========
import backgroundTitlePage from '@/res/titlePage/backgroundTitlePage.svg'
import supplierImg from '@/res/titlePage/supplier.svg'
import engineerImg from '@/res/titlePage/engineer.svg'
import accountantImg from '@/res/titlePage/accountant.svg'



export default function Login(){
    const [login, setLogin] = useState<String>('')
    const router = useRouter()
    let nowUser = null

    interface User{
        login:String
        access:String[]
    }

    const users = [
        {
            login:'Oleg',
            access:[{name:'Бухгалтер',page:'accountant',img:accountantImg},{name:'Инженер',page:'engineer',img:engineerImg},{name:'Поставщик',page:'supplier',img:supplierImg}]
        },
        {
            login:'Ev',
            access:[{name:'Бухгалтер',page:'accountant',img:accountantImg},{name:'Инженер',page:'engineer',img:engineerImg}]
        }
    ]

  
    users.forEach((user:any)=>{
        if(user.login === login && login !== ''){
            nowUser= user
        }
    })

    return(
        <main className='titlePage'>
            
            <div className='auth'>
                <h1>Авторизация</h1>
                <div className='inputZone'>
                    <Image src={user} width={50} height={50} alt="login"/>
                    <input type="text" onChange={(e)=>setLogin(e.target.value)} placeholder="Введите ваш логин"/>
                </div>
                {
                   nowUser !== null?<h2>Выберите роль</h2>:<></>
                }
                
                

                {
                    nowUser !== null?nowUser.access.map((item:any,index:number)=>{
                        
                        return <div className='icons' alt={item.name} key={index}>
                            <Image src={item.img} width={50} height={50} alt="login" onClick={()=>router.push(item.page)}/>
                            {/* <Link href={item.page} key={index}><br/>{item.name}</Link> */}
                        </div>
                    }):<></>
                }

                
            </div>

            <div className='slyder'>
                <Image src={backgroundTitlePage} width={1100} height={800} alt="sl_1"/>
            </div>
            
        </main>
    )
}