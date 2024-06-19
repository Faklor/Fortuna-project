'use client'
import Image from 'next/image'
import './order.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'

//----------------res----------------------
import categoryImg from '@/res/category.svg'
import linkImg from '@/res/link.svg'
import plus from '@/res/plusCount.svg'
import minus from '@/res/minus.svg'
import sum from '@/res/sum.svg'
import user from '@/res/user.svg'

import manufacturerImg  from '@/res/manufacturer.svg'
import number from '@/res/number.svg'
import sellNumber from '@/res/sellNumber.svg'

export default function Order(order:any){

    //-----------------state----------------------
    let [category, setCategory] = useState<Array<object>>([])

    //-----------------redux----------------------
    const URLMAINPC = useAppSelector<any>(state => state.URLMAINPC.URLMAINPC)



    //------------------fs------------------------
    async function categoryes() {
        return await axios.get(`http://${URLMAINPC}:3000/api/catagoryes`)
    }
    useEffect(()=>{
        categoryes()
        .then(res=>{
            //console.log(res.data)
            
            setCategory(res.data)
        })
    },[])

    return(
        <div className='fullOrder'>
            <div className='date'>
                {order[0]}
            </div>
            <div className='orders'> 
                {order[1].map((orderOne:any, index:number)=>{
                    
                    return <div key={index} className='order'>
                        <div className='worker'>
                            <Image src={user} width={25} height={25} alt='Работник' className='visible'/>
                            <p>{orderOne.worker}</p>
                        </div>
                        
                        <div className='partOrder'>
           
                            
             
                            <div className='category'>
                                    
                                {/* <Image src={categoryImg} width={55} height={55} alt='Категория' className='visible'/> */}
                                {category.map((item:any, index:any)=>{
                                        if(orderOne.part.catagory === item.title){
                                            return <Image src={`/categoryes/${item.file}`} width={55} height={55} alt='Категория' className='visible' key={index}/>
                                        }
                                        
                                })}
                                        
                            </div>
                            <div  className='content'>
                                <div className='name'>
                                            
                                    <Image src={linkImg} width={25} height={25} alt='Ссылка' className='visible'/>
                                            
                                    <p>{orderOne.part.name}</p>
                                </div>
                                        
                                <div className='sum'>
                                            
                                    <Image src={sum} width={25} height={25} alt='Цена' className='visible'/>
                                    <p>{orderOne.part.sum} р.</p>
                                </div>
                        
                        
                            </div>
                            <div className='count'>
                                <p className='countBlock'>{orderOne.part.count} шт. </p>
                        
                        
                    
                            </div>

                            <div className='otherData'>

                                    {orderOne.part.serialNumber?<div className='other'>
                                        <Image src={number} width={25} height={25} alt='Добавить 1-ну запчасть' className='visible' />
                                        <p>{orderOne.part.serialNumber}</p>
                                    </div>
                                    :
                                    ''} 

                                    {orderOne.part.sellNumber?<div className='other'>
                                        <Image src={sellNumber} width={25} height={25} alt='Добавить 1-ну запчасть' className='visible'/>
                                        <p>{orderOne.part.sellNumber}</p>
                                    </div>
                                    :
                                    ''} 

                                    {orderOne.part.manufacturer?<div className='other'>
                                        <Image src={manufacturerImg} width={25} height={25} alt='Добавить 1-ну запчасть' className='visible' />
                                        <p>{orderOne.part.manufacturer}</p>
                                    </div>
                                    :
                                    ''} 
                                    
                            </div>
            
                        </div>    
                        
                    </div>
                })}
            </div>
            
        </div>
    )
}